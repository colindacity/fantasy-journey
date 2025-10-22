// Conversation state
let conversationHistory = [];
let userProfile = {
  preferences: {},
  booksDiscussed: [],
  currentTopic: null
};

// Daniel's conversation patterns and responses
const conversationFlow = {
  greeting: {
    messages: [
      "Hey there! Let's be real - finding the right fantasy book can be overwhelming. But I'm here to help you find which specific subgenre you may become addicted to.",
      "So, have you read much fantasy before, or are you brand new to the genre?"
    ],
    quickReplies: [
      { text: "I'm brand new!", response: "newReader" },
      { text: "I've read some", response: "someExperience" },
      { text: "I'm well-read", response: "experienced" },
      { text: "Just recommend something!", response: "impatient" }
    ]
  },
  newReader: {
    messages: [
      "Perfect! No judgment here. Everyone starts somewhere. And if you disagree with my recommendations, too bad. Stop trying to read. You're bad at it. (I'm kidding... mostly.)",
      "Let's start with the basics. I always recommend The Hobbit as a starting point. It's a perfect book. Have you read it, or would you like to start there?"
    ],
    quickReplies: [
      { text: "Yes, read The Hobbit", response: "readHobbit" },
      { text: "No, haven't read it", response: "startWithHobbit" },
      { text: "Can we skip classics?", response: "skipClassics" }
    ]
  },
  someExperience: {
    messages: [
      "Nice! So you've dipped your toes in the fantasy pool. Let me ask you this:",
      "What hooked you about the fantasy you've read so far? Was it the epic worldbuilding and lore, or more the character journeys and stories?"
    ],
    quickReplies: [
      { text: "The worldbuilding and magic!", response: "worldbuildingFan" },
      { text: "The characters and stories", response: "characterFan" },
      { text: "Honestly, both", response: "balanced" },
      { text: "Neither really grabbed me", response: "struggling" }
    ]
  },
  experienced: {
    messages: [
      "Ah, a seasoned reader! Excellent. Then you know the pain of finishing a series you love and having that hollowness in your chest that you can never fill.",
      "So what are you looking for? Want to explore new subgenres, or dig deeper into what you already love?"
    ],
    quickReplies: [
      { text: "Explore new subgenres", response: "exploreNew" },
      { text: "More of what I love", response: "similarRecs" },
      { text: "Challenge me", response: "challengingRecs" }
    ]
  },
  impatient: {
    messages: [
      "Alright, alright! I respect the hustle. But I need to know at least ONE thing about your taste, or I'm just throwing darts blindfolded here.",
      "Quick question: Light and cozy, or dark and gritty?"
    ],
    quickReplies: [
      { text: "Light and cozy", response: "preferLight" },
      { text: "Dark and gritty", response: "preferDark" },
      { text: "Somewhere in between", response: "preferModerate" }
    ]
  },
  readHobbit: {
    messages: [
      "Excellent choice! Now, here's the million-dollar question:",
      "Were you more enamored by the beauty, world, and lore of Middle Earth, or were you less into all the dragon stuff and preferred the adventure aspects?"
    ],
    quickReplies: [
      { text: "Loved the world and lore!", response: "epicFantasyPath" },
      { text: "Great story, less into dragons", response: "urbanFantasyPath" }
    ]
  },
  worldbuildingFan: {
    messages: [
      "Ah, a worldbuilding enthusiast! You're the type who loves those maps at the beginning of books and actually reads the appendices. Respect.",
      "Do you want that worldbuilding to be more classic high fantasy, or something with a modern twist?"
    ],
    quickReplies: [
      { text: "Classic high fantasy", response: "epicFantasyPath" },
      { text: "Modern twist", response: "modernFantasyPath" },
      { text: "Something really unique", response: "weirdFantasyPath" }
    ]
  },
  characterFan: {
    messages: [
      "Character-driven! I like it. Now, let me ask you this:",
      "Do you want characters who are heroes on epic quests, or more grounded people dealing with realistic struggles (with magic involved, obviously)?"
    ],
    quickReplies: [
      { text: "Epic heroes!", response: "epicFantasyPath" },
      { text: "Grounded and realistic", response: "realisticFantasyPath" }
    ]
  },
  epicFantasyPath: {
    messages: [
      "Alright! So you want the SCOPE. Multiple POVs, sprawling continents, detailed magic systems, the works. I've got some thoughts.",
      "Let's talk Mistborn by Brandon Sanderson. This is a nexus point. Have you read it?"
    ],
    quickReplies: [
      { text: "Yes, loved it!", response: "lovedMistborn" },
      { text: "Yes, it was okay", response: "mistbornOkay" },
      { text: "No, not yet", response: "recommendMistborn" }
    ],
    bookRec: {
      title: "Mistborn: The Final Empire",
      author: "Brandon Sanderson",
      description: "What if Sauron won and took over? An orphan Mistborn and a crew try to overthrow the Lord Ruler."
    }
  },
  urbanFantasyPath: {
    messages: [
      "Interesting! So less sword and sorcery, more contemporary magic. We can work with that.",
      "Have you tried The Golden Compass? It's a great litmus test for urban fantasy - alternative world, real-world elements, great commentary."
    ],
    quickReplies: [
      { text: "Yes, loved it", response: "lovedGoldenCompass" },
      { text: "Haven't read it", response: "recommendGoldenCompass" },
      { text: "Want something more modern", response: "moreModernUrban" }
    ],
    bookRec: {
      title: "The Golden Compass",
      author: "Philip Pullman",
      description: "Lyra and her daemon investigate mysteries involving Dust, other worlds, and her lineage in an alternative reality."
    }
  },
  modernFantasyPath: {
    messages: [
      "Modern fantasy! Jack the box. You like contemporary sensibilities, diverse perspectives, and prose that doesn't feel like it was written in 1954.",
      "You HAVE to check out The Will of the Many by James Islington. It's based on classical culture but feels fresh and modern. Trust me on this one."
    ],
    quickReplies: [
      { text: "Tell me more!", response: "moreWillOfMany" },
      { text: "What else you got?", response: "moreModernRecs" }
    ],
    bookRec: {
      title: "The Will of the Many",
      author: "James Islington",
      description: "Non-medieval fantasy where you can trust nobody. Everyone's a suspect. Based on classical culture with modern sensibilities."
    }
  },
  preferDark: {
    messages: [
      "Ooh, you want the darkness. You want to question whether humanity should be saved. I can work with this.",
      "How dark are we talking? Game of Thrones dark, or like... therapy-requiring Black Company dark?"
    ],
    quickReplies: [
      { text: "Game of Thrones level", response: "moderateDark" },
      { text: "MAXIMUM DARKNESS", response: "grimdarkPath" },
      { text: "Dark but not too brutal", response: "darkButBalanced" }
    ]
  },
  preferLight: {
    messages: [
      "Cozy fantasy! There's been a huge rise in this recently. People needed a break after all that grimdark.",
      "Are we talking 'orc opening a coffee shop' cozy, or more like 'lighthearted adventure' cozy?"
    ],
    quickReplies: [
      { text: "Maximum cozy vibes", response: "cozyFantasyPath" },
      { text: "Light adventure", response: "lightAdventurePath" }
    ]
  },
  grimdarkPath: {
    messages: [
      "Listen. If you want darker than Black Company, one: go to therapy. Two: congratulations, you found your niche. It is grimdark.",
      "Start with The First Law trilogy by Joe Abercrombie. One of the main protagonists is a torturer and you'll love him. It sounds psychotic until you read it."
    ],
    quickReplies: [
      { text: "Sign me up!", response: "confirmGrimdark" },
      { text: "Maybe slightly less dark", response: "darkButBalanced" }
    ],
    bookRec: {
      title: "The Blade Itself (The First Law)",
      author: "Joe Abercrombie",
      description: "Grimdark with political intrigue. Jobie makes you love horrible people. It's a knack he has."
    }
  },
  cozyFantasyPath: {
    messages: [
      "If you want cozier than House in the Cerulean Sea, I recommend you buy a blanket and start reading the threads, because congratulations - you've found your niche!",
      "Start with Legends & Lattes. It's the ultimate 'sip a cup of tea, wrap yourself in a blanket' fantasy book. An orc opens a coffee shop. That's it. That's the whole vibe."
    ],
    quickReplies: [
      { text: "Perfect!", response: "confirmCozy" },
      { text: "Give me all the recs", response: "moreCozyRecs" }
    ],
    bookRec: {
      title: "Legends & Lattes",
      author: "Travis Baldree",
      description: "An orc opens a coffee shop and deals with the day-to-day business of small city life. Peak cozy."
    }
  },
  lovedMistborn: {
    messages: [
      "Excellent! So you're probably already down the Cosmere rabbit hole. Your family is going to miss you. See you in 6 months.",
      "But if you want to explore beyond Sanderson, do you want more hard magic systems, or are you interested in different types of epic fantasy?"
    ],
    quickReplies: [
      { text: "More hard magic!", response: "hardMagicPath" },
      { text: "Different epic fantasy", response: "epicVariety" },
      { text: "Actually, tell me about Stormlight", response: "stormlightInfo" }
    ]
  },
  hardMagicPath: {
    messages: [
      "You little freak. Your wand is throbbing for those detailed, intricate magic systems.",
      "Pick up The Black Prism by Brent Weeks. It's got the most fun, flamboyant magic system - color drafting. Different colors = different powers. Use too much and you'll break the color in your eye and go crazy. It's wild."
    ],
    quickReplies: [
      { text: "That sounds amazing!", response: "confirmHardMagic" },
      { text: "What else?", response: "moreHardMagic" }
    ],
    bookRec: {
      title: "The Black Prism",
      author: "Brent Weeks",
      description: "Color-based hard magic system. The most fun and flamboyant magic you'll read."
    }
  },
  confirmGrimdark: {
    messages: [
      "Alright, you've been warned. Don't say I didn't tell you when you're questioning your faith in humanity.",
      "Other grimdark essentials: A Song of Ice and Fire (obviously), The Black Company if you want to go DARKER, and The Poppy War if you want historical-inspired trauma."
    ],
    quickReplies: [
      { text: "Thanks! What else can you recommend?", response: "askMore" },
      { text: "That's perfect, thanks!", response: "satisfied" }
    ]
  }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Send initial greeting
  setTimeout(() => {
    sendDanielMessage(conversationFlow.greeting);
  }, 500);

  // Event listeners
  document.getElementById('sendBtn').addEventListener('click', sendUserMessage);
  document.getElementById('chatInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendUserMessage();
  });
  document.getElementById('resetChatBtn').addEventListener('click', resetChat);
});

function sendUserMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();

  if (!message) return;

  // Display user message
  addMessage(message, 'user');
  input.value = '';

  // Process response
  setTimeout(() => {
    processUserInput(message);
  }, 800);
}

function addMessage(text, sender = 'daniel', bookRec = null) {
  const messagesContainer = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}`;

  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.textContent = sender === 'daniel' ? 'DG' : 'You';

  const content = document.createElement('div');
  content.className = 'message-content';

  const messageText = document.createElement('div');
  messageText.textContent = text;
  content.appendChild(messageText);

  // Add book recommendation card if provided
  if (bookRec) {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card-mini';
    bookCard.innerHTML = `
      <strong>${bookRec.title}</strong>
      <em>by ${bookRec.author}</em>
      <p>${bookRec.description}</p>
    `;
    content.appendChild(bookCard);
  }

  const time = document.createElement('div');
  time.className = 'message-time';
  time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  content.appendChild(time);

  messageDiv.appendChild(avatar);
  messageDiv.appendChild(content);

  messagesContainer.appendChild(messageDiv);
  scrollToBottom();

  // Save to history
  conversationHistory.push({ text, sender, time: new Date() });
}

function sendDanielMessage(flow) {
  showTypingIndicator();

  setTimeout(() => {
    hideTypingIndicator();

    // Send messages
    flow.messages.forEach((msg, index) => {
      setTimeout(() => {
        addMessage(msg, 'daniel', index === flow.messages.length - 1 ? flow.bookRec : null);

        // Show quick replies after last message
        if (index === flow.messages.length - 1 && flow.quickReplies) {
          showQuickReplies(flow.quickReplies);
        }
      }, index * 1000);
    });
  }, 1200);
}

function showQuickReplies(replies) {
  const container = document.getElementById('quickReplies');
  container.innerHTML = '';

  replies.forEach(reply => {
    const btn = document.createElement('button');
    btn.className = 'quick-reply-btn';
    btn.textContent = reply.text;
    btn.onclick = () => handleQuickReply(reply);
    container.appendChild(btn);
  });
}

function handleQuickReply(reply) {
  // Clear quick replies
  document.getElementById('quickReplies').innerHTML = '';

  // Add user message
  addMessage(reply.text, 'user');

  // Get response flow
  const nextFlow = conversationFlow[reply.response];
  if (nextFlow) {
    setTimeout(() => {
      sendDanielMessage(nextFlow);
    }, 800);
  } else {
    // Fallback
    setTimeout(() => {
      addMessage("Hmm, I'm not sure how to respond to that. Let me know what you're looking for and I'll do my best to help!", 'daniel');
    }, 800);
  }
}

function processUserInput(message) {
  const lowerMessage = message.toLowerCase();

  // Simple keyword matching for demo purposes
  let response = conversationFlow.someExperience; // default

  if (lowerMessage.includes('dark') || lowerMessage.includes('grim')) {
    response = conversationFlow.preferDark;
  } else if (lowerMessage.includes('cozy') || lowerMessage.includes('light') || lowerMessage.includes('comfort')) {
    response = conversationFlow.preferLight;
  } else if (lowerMessage.includes('magic') || lowerMessage.includes('system')) {
    response = conversationFlow.hardMagicPath;
  } else if (lowerMessage.includes('epic') || lowerMessage.includes('long') || lowerMessage.includes('series')) {
    response = conversationFlow.epicFantasyPath;
  } else if (lowerMessage.includes('modern') || lowerMessage.includes('contemporary') || lowerMessage.includes('urban')) {
    response = conversationFlow.modernFantasyPath;
  } else {
    // Generic helpful response
    showTypingIndicator();
    setTimeout(() => {
      hideTypingIndicator();
      addMessage("That's interesting! Let me ask you this: what's most important to you in a fantasy book? The magic system, the characters, the worldbuilding, or the overall vibe?", 'daniel');
      showQuickReplies([
        { text: "Magic system", response: "hardMagicPath" },
        { text: "Characters", response: "characterFan" },
        { text: "Worldbuilding", response: "worldbuildingFan" },
        { text: "The vibe", response: "preferLight" }
      ]);
    }, 800);
    return;
  }

  sendDanielMessage(response);
}

function showTypingIndicator() {
  const indicator = document.getElementById('typingIndicator');
  const messagesContainer = document.getElementById('chatMessages');
  messagesContainer.appendChild(indicator);
  indicator.style.display = 'flex';
  scrollToBottom();
}

function hideTypingIndicator() {
  const indicator = document.getElementById('typingIndicator');
  indicator.style.display = 'none';
}

function scrollToBottom() {
  const container = document.getElementById('chatMessages');
  container.scrollTop = container.scrollHeight;
}

function resetChat() {
  if (confirm('Start a new conversation? This will clear your chat history.')) {
    conversationHistory = [];
    userProfile = { preferences: {}, booksDiscussed: [], currentTopic: null };

    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.innerHTML = `
      <div class="chat-welcome">
        <div class="welcome-avatar">📚</div>
        <h2>Welcome to Your Personal Fantasy Guide</h2>
        <p>Chat with an AI trained on Daniel Greene's recommendations. I'll help you find your perfect fantasy subgenre through conversation.</p>
        <div class="ornament"></div>
      </div>
    `;

    document.getElementById('quickReplies').innerHTML = '';

    setTimeout(() => {
      sendDanielMessage(conversationFlow.greeting);
    }, 500);
  }
}
