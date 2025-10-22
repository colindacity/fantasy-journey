// Interactive Fantasy Map Handler
// Manages SVG rendering, zooming, panning, and interactions

class FantasyMap {
    constructor(svgElement, data) {
        this.svg = svgElement;
        this.data = data;

        // Map dimensions and scaling
        this.width = 100; // coordinate space
        this.height = 100;
        this.scale = 1;
        this.translateX = 0;
        this.translateY = 0;

        // Interaction state
        this.isDragging = false;
        this.dragStart = { x: 0, y: 0 };
        this.showPaths = true;

        // Layout configuration
        this.nodeRadius = 2.5;
        this.fontSize = 1.2;

        this.init();
    }

    init() {
        // Set SVG viewBox
        this.svg.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`);

        // Get layers
        this.connectionsLayer = document.getElementById('connections-layer');
        this.nodesLayer = document.getElementById('nodes-layer');

        // Render the map
        this.renderConnections();
        this.renderNodes();

        // Set up interactions
        this.setupInteractions();

        // Initial view centering
        this.resetView();
    }

    renderConnections() {
        this.connectionsLayer.innerHTML = '';

        this.data.connections.forEach(conn => {
            const fromNode = this.data.nodes.find(n => n.id === conn.from);
            const toNode = this.data.nodes.find(n => n.id === conn.to);

            if (!fromNode || !toNode) return;

            // Create path element
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

            // Calculate curved path
            const midX = (fromNode.x + toNode.x) / 2;
            const midY = (fromNode.y + toNode.y) / 2;

            // Add slight curve for visual appeal
            const dx = toNode.x - fromNode.x;
            const dy = toNode.y - fromNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Perpendicular offset for curve
            const curveOffset = distance * 0.15;
            const perpX = -dy / distance * curveOffset;
            const perpY = dx / distance * curveOffset;

            const controlX = midX + perpX;
            const controlY = midY + perpY;

            const pathData = `M ${fromNode.x} ${fromNode.y} Q ${controlX} ${controlY} ${toNode.x} ${toNode.y}`;

            path.setAttribute('d', pathData);
            path.setAttribute('class', `connection ${conn.type === 'dotted' ? 'connection-dotted' : ''}`);
            path.setAttribute('data-from', conn.from);
            path.setAttribute('data-to', conn.to);

            // Add marker if it's a directional connection
            if (conn.type !== 'dotted') {
                path.setAttribute('marker-end', 'url(#arrowhead)');
            }

            // Add label if exists
            if (conn.label) {
                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', controlX);
                text.setAttribute('y', controlY);
                text.setAttribute('class', 'connection-label');
                text.setAttribute('font-size', '0.8');
                text.setAttribute('fill', '#cbd5e1');
                text.setAttribute('text-anchor', 'middle');
                text.setAttribute('opacity', '0.7');
                text.textContent = conn.label;
                this.connectionsLayer.appendChild(text);
            }

            this.connectionsLayer.appendChild(path);
        });
    }

    renderNodes() {
        this.nodesLayer.innerHTML = '';

        this.data.nodes.forEach(node => {
            // Create node group
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.setAttribute('class', `node node-type-${node.type} ${node.mustRead ? 'node-must-read' : ''}`);
            g.setAttribute('data-id', node.id);
            g.setAttribute('transform', `translate(${node.x}, ${node.y})`);

            // Glow effect for important nodes
            if (node.mustRead) {
                const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                glow.setAttribute('r', this.nodeRadius * 1.8);
                glow.setAttribute('fill', 'url(#nodeGlow)');
                glow.setAttribute('class', 'node-glow pulse');
                g.appendChild(glow);
            }

            // Main circle
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('r', this.nodeRadius);
            circle.setAttribute('class', 'node-circle');
            g.appendChild(circle);

            // Icon/emoji
            if (node.icon) {
                const icon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                icon.setAttribute('y', 0.5);
                icon.setAttribute('text-anchor', 'middle');
                icon.setAttribute('font-size', this.fontSize * 1.5);
                icon.textContent = node.icon;
                g.appendChild(icon);
            }

            // Title text
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('y', this.nodeRadius + 2);
            text.setAttribute('class', 'node-text');
            text.setAttribute('font-size', this.fontSize);
            text.textContent = node.title;
            g.appendChild(text);

            // Must-read indicator
            if (node.mustRead) {
                const star = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                star.setAttribute('y', this.nodeRadius + 3.5);
                star.setAttribute('text-anchor', 'middle');
                star.setAttribute('font-size', this.fontSize);
                star.textContent = '⭐';
                g.appendChild(star);
            }

            // Add click handler
            g.style.cursor = 'pointer';
            g.addEventListener('click', () => this.onNodeClick(node));

            // Hover effects
            g.addEventListener('mouseenter', () => this.onNodeHover(node.id, true));
            g.addEventListener('mouseleave', () => this.onNodeHover(node.id, false));

            this.nodesLayer.appendChild(g);
        });
    }

    onNodeClick(node) {
        // Trigger modal opening (handled in main.js)
        window.dispatchEvent(new CustomEvent('nodeClick', { detail: node }));
    }

    onNodeHover(nodeId, isHovering) {
        // Highlight connected paths
        const connections = this.data.connections.filter(c =>
            c.from === nodeId || c.to === nodeId
        );

        connections.forEach(conn => {
            const path = this.connectionsLayer.querySelector(
                `[data-from="${conn.from}"][data-to="${conn.to}"]`
            );
            if (path) {
                path.style.opacity = isHovering ? '1' : '0.5';
                path.style.strokeWidth = isHovering ? '3' : '2';
            }
        });
    }

    setupInteractions() {
        // Zoom controls
        document.getElementById('zoom-in').addEventListener('click', () => this.zoom(1.3));
        document.getElementById('zoom-out').addEventListener('click', () => this.zoom(0.7));
        document.getElementById('reset-view').addEventListener('click', () => this.resetView());
        document.getElementById('toggle-paths').addEventListener('click', () => this.togglePaths());

        // Mouse wheel zoom
        this.svg.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            this.zoom(delta);
        });

        // Drag to pan
        this.svg.addEventListener('mousedown', (e) => {
            if (e.target.closest('.node')) return; // Don't drag when clicking nodes
            this.isDragging = true;
            this.dragStart = {
                x: e.clientX - this.translateX,
                y: e.clientY - this.translateY
            };
            this.svg.style.cursor = 'grabbing';
        });

        this.svg.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;

            this.translateX = e.clientX - this.dragStart.x;
            this.translateY = e.clientY - this.dragStart.y;
            this.updateTransform();
        });

        this.svg.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.svg.style.cursor = 'grab';
        });

        this.svg.addEventListener('mouseleave', () => {
            this.isDragging = false;
            this.svg.style.cursor = 'grab';
        });

        // Touch support for mobile
        let touchStartDistance = 0;
        let lastTouchScale = 1;

        this.svg.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                // Pinch to zoom
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                touchStartDistance = Math.sqrt(dx * dx + dy * dy);
            } else if (e.touches.length === 1) {
                // Pan
                this.isDragging = true;
                this.dragStart = {
                    x: e.touches[0].clientX - this.translateX,
                    y: e.touches[0].clientY - this.translateY
                };
            }
        });

        this.svg.addEventListener('touchmove', (e) => {
            e.preventDefault();

            if (e.touches.length === 2) {
                // Pinch zoom
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const scale = distance / touchStartDistance;

                this.zoom(scale / lastTouchScale);
                lastTouchScale = scale;
            } else if (e.touches.length === 1 && this.isDragging) {
                // Pan
                this.translateX = e.touches[0].clientX - this.dragStart.x;
                this.translateY = e.touches[0].clientY - this.dragStart.y;
                this.updateTransform();
            }
        });

        this.svg.addEventListener('touchend', (e) => {
            this.isDragging = false;
            if (e.touches.length < 2) {
                touchStartDistance = 0;
                lastTouchScale = 1;
            }
        });
    }

    zoom(factor) {
        this.scale *= factor;
        this.scale = Math.max(0.5, Math.min(5, this.scale)); // Limit zoom range
        this.updateTransform();
    }

    resetView() {
        this.scale = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.updateTransform();
    }

    updateTransform() {
        const container = this.svg.parentElement;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        // Center the view
        const scaleX = containerWidth / this.width;
        const scaleY = containerHeight / this.height;
        const baseScale = Math.min(scaleX, scaleY) * 0.9;

        // Calculate centered offset
        const offsetX = (containerWidth - this.width * baseScale * this.scale) / 2;
        const offsetY = (containerHeight - this.height * baseScale * this.scale) / 2;

        // Apply transform
        this.svg.style.transform = `
            translate(${offsetX + this.translateX}px, ${offsetY + this.translateY}px)
            scale(${baseScale * this.scale})
        `;
    }

    togglePaths() {
        this.showPaths = !this.showPaths;
        this.connectionsLayer.style.opacity = this.showPaths ? '1' : '0.1';

        const btn = document.getElementById('toggle-paths');
        btn.style.opacity = this.showPaths ? '1' : '0.5';
    }

    highlightPath(startNodeId, endNodeId) {
        // BFS to find path between nodes
        const path = this.findPath(startNodeId, endNodeId);

        if (!path) return;

        // Dim all connections
        const allConnections = this.connectionsLayer.querySelectorAll('.connection');
        allConnections.forEach(conn => {
            conn.style.opacity = '0.1';
        });

        // Highlight path connections
        for (let i = 0; i < path.length - 1; i++) {
            const connection = this.connectionsLayer.querySelector(
                `[data-from="${path[i]}"][data-to="${path[i + 1]}"]`
            );
            if (connection) {
                connection.style.opacity = '1';
                connection.style.strokeWidth = '4';
                connection.style.stroke = '#fbbf24';
            }
        }

        // Highlight nodes in path
        path.forEach(nodeId => {
            const node = this.nodesLayer.querySelector(`[data-id="${nodeId}"]`);
            if (node) {
                node.classList.add('pulse');
            }
        });
    }

    clearHighlights() {
        // Reset all connections
        const allConnections = this.connectionsLayer.querySelectorAll('.connection');
        allConnections.forEach(conn => {
            conn.style.opacity = '0.5';
            conn.style.strokeWidth = '2';
            conn.style.stroke = '';
        });

        // Remove pulse from nodes
        const allNodes = this.nodesLayer.querySelectorAll('.node');
        allNodes.forEach(node => {
            node.classList.remove('pulse');
        });
    }

    findPath(startId, endId) {
        // BFS to find shortest path
        const queue = [[startId]];
        const visited = new Set([startId]);

        while (queue.length > 0) {
            const path = queue.shift();
            const node = path[path.length - 1];

            if (node === endId) {
                return path;
            }

            const connections = this.data.connections.filter(c => c.from === node);
            for (const conn of connections) {
                if (!visited.has(conn.to)) {
                    visited.add(conn.to);
                    queue.push([...path, conn.to]);
                }
            }
        }

        return null;
    }

    focusNode(nodeId) {
        const node = this.data.nodes.find(n => n.id === nodeId);
        if (!node) return;

        // Calculate translation to center the node
        const container = this.svg.parentElement;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        const scaleX = containerWidth / this.width;
        const scaleY = containerHeight / this.height;
        const baseScale = Math.min(scaleX, scaleY) * 0.9;

        this.translateX = containerWidth / 2 - node.x * baseScale * this.scale;
        this.translateY = containerHeight / 2 - node.y * baseScale * this.scale;

        this.updateTransform();

        // Add highlight animation
        const nodeElement = this.nodesLayer.querySelector(`[data-id="${nodeId}"]`);
        if (nodeElement) {
            nodeElement.classList.add('pulse');
            setTimeout(() => {
                nodeElement.classList.remove('pulse');
            }, 2000);
        }
    }
}

// Initialize map when DOM is loaded
let fantasyMap;

function initializeMap() {
    const svgElement = document.getElementById('fantasy-map');
    if (svgElement && typeof fantasyData !== 'undefined') {
        fantasyMap = new FantasyMap(svgElement, fantasyData);

        // Handle window resize
        window.addEventListener('resize', () => {
            fantasyMap.updateTransform();
        });
    }
}

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMap);
} else {
    initializeMap();
}
