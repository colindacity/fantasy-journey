// Fantasy Reading Guide Data Structure
// Based on "The ULTIMATE Fantasy Reading Guide" YouTube video

const fantasyData = {
    nodes: [
        // STARTING POINT
        {
            id: 'the-hobbit',
            title: 'The Hobbit',
            author: 'J.R.R. Tolkien',
            type: 'start',
            x: 50,
            y: 50,
            mustRead: true,
            description: 'A perfect book. The classic starting point for any fantasy journey. Follow Bilbo Baggins there and back again through Middle Earth.',
            quote: '"A perfect book. And if you disagree with me on that this early on, too bad. Stop trying to read. You\'re bad at it."',
            videoTimestamp: '87',
            icon: '🏔️',
            decisions: [
                {
                    question: 'Were you more enamored by the beauty, world, and lore?',
                    nextNode: 'wizard-earthsea',
                    direction: 'south'
                },
                {
                    question: 'You enjoyed it but not necessarily down for all this dragon stuff?',
                    nextNode: 'golden-compass',
                    direction: 'north'
                }
            ]
        },

        // EPIC FANTASY PATH (SOUTH)
        {
            id: 'wizard-earthsea',
            title: 'A Wizard of Earthsea',
            author: 'Ursula K. Le Guin',
            type: 'decision',
            x: 50,
            y: 20,
            description: 'A transitional story from classic to modern fantasy. Provides a slightly different taste to epic fantasy worldbuilding while getting into more relatable modern themes.',
            quote: '"Wizard of Earthsea has more things that you can directly relate to. It follows a character through a whimsical world with vastly different narrative choices."',
            videoTimestamp: '130',
            icon: '🌊',
            decisions: [
                {
                    question: 'Do you want something darker?',
                    nextNode: 'dragonbone-chair',
                    direction: 'darker'
                },
                {
                    question: 'Did you enjoy the lighter escapism?',
                    nextNode: 'small-gods',
                    direction: 'lighter'
                }
            ]
        },

        // COZY/COMEDY PATH
        {
            id: 'small-gods',
            title: 'Small Gods',
            author: 'Terry Pratchett',
            type: 'book',
            x: 20,
            y: 25,
            description: 'Terry Pratchett takes the piss out of religion in a respectful way. Filled with satire of organized religion as we follow Brother Brutha who can hear the voice of God.',
            quote: '"It\'s a blast. And I think it is a good idea to get comedy within fantasy addressed early on because it tends to be a pretty divisive angle to the genre."',
            videoTimestamp: '183',
            icon: '🐢',
            decisions: [
                {
                    question: 'You like classic and light?',
                    nextNode: 'narnia',
                    direction: 'lighter'
                },
                {
                    question: 'You like the interesting worldbuilding but not the comedy?',
                    nextNode: 'mistborn',
                    direction: 'serious'
                }
            ]
        },

        {
            id: 'narnia',
            title: 'The Lion, the Witch and the Wardrobe',
            author: 'C.S. Lewis',
            type: 'book',
            x: 15,
            y: 35,
            description: 'A classic that verges into cozy territory. A YA story that treats its audience like they were mature and could understand complex themes.',
            videoTimestamp: '242',
            icon: '🦁',
            decisions: [
                {
                    question: 'Want something cozier?',
                    nextNode: 'legends-lattes',
                    direction: 'cozy'
                },
                {
                    question: 'Like it for the YA angle, not the coziness?',
                    nextNode: 'old-kingdom',
                    direction: 'ya'
                },
                {
                    question: 'Need something less light?',
                    nextNode: 'mistborn',
                    direction: 'less-light'
                }
            ]
        },

        {
            id: 'legends-lattes',
            title: 'Legends & Lattes',
            author: 'Travis Baldree',
            type: 'book',
            x: 10,
            y: 45,
            description: 'The flagship for the cozy genre. Follow an orc opening a coffee shop, struggling with the day-to-day business of small city life. The ultimate sip a cup of tea, wrap yourself in a blanket fantasy book.',
            videoTimestamp: '288',
            icon: '☕',
            decisions: [
                {
                    question: 'Still too much conflict? Want cozier?',
                    nextNode: 'house-cerulean-sea',
                    direction: 'cozier'
                }
            ]
        },

        {
            id: 'house-cerulean-sea',
            title: 'The House in the Cerulean Sea',
            author: 'TJ Klune',
            type: 'subgenre',
            x: 5,
            y: 55,
            mustRead: false,
            description: 'Follows an LGBTQ+ protagonist as he explores a magical orphanage. If you want even cozier than this, buy a blanket and start reading the threads.',
            quote: '"If you somehow want to go even cozier than that, I recommend you buy a blanket and start just reading the threads because we have already found your specific subgenre niche, and that is going to be cozy fantasy."',
            videoTimestamp: '304',
            icon: '🏡',
            subgenre: 'Cozy Fantasy',
            recommendations: ['Cozy fantasy novels']
        },

        // HARD MAGIC PATH
        {
            id: 'mistborn',
            title: 'Mistborn: The Final Empire',
            author: 'Brandon Sanderson',
            type: 'decision',
            x: 30,
            y: 30,
            mustRead: true,
            description: 'A nexus point of the flowchart. Modern style fantasy with hard magic system. What if Sauron was in charge and took over Middle Earth? Features allomancy magic and a subversion of the Gandalf mentor trope.',
            quote: '"Most likely if you read Mistborn, you might take note of the fact that it has a definite modern style to it, vastly different than that of The Hobbit."',
            videoTimestamp: '378',
            icon: '⚗️',
            decisions: [
                {
                    question: 'Like the hard magic system?',
                    nextNode: 'shadow-what-was-lost',
                    direction: 'harder-magic'
                },
                {
                    question: 'Want more epic, less modern?',
                    nextNode: 'dragonbone-chair',
                    direction: 'more-epic'
                },
                {
                    question: 'Want something not quite as challenging but more?',
                    nextNode: 'elric-melnibone',
                    direction: 'more'
                }
            ]
        },

        {
            id: 'shadow-what-was-lost',
            title: 'The Shadow of What Was Lost',
            author: 'James Islington',
            type: 'book',
            x: 35,
            y: 20,
            description: 'Slow burn hard magic system that creeps up throughout the pages. Perfect for those who want their magic systems well-defined.',
            videoTimestamp: '470',
            icon: '🔮',
            decisions: [
                {
                    question: 'Want to go harder with magic?',
                    nextNode: 'black-prism',
                    direction: 'harder'
                }
            ]
        },

        {
            id: 'black-prism',
            title: 'The Black Prism',
            author: 'Brent Weeks',
            type: 'subgenre',
            x: 40,
            y: 15,
            description: 'Epic fantasy with the most fun, flamboyant magic system based on color drafting. Different colors provide different projections. Use too much and you\'ll break the color in your eye and lose yourself to the crazies.',
            quote: '"And it might be the most fun, flamboyant magic system we\'re going to talk about here today."',
            videoTimestamp: '498',
            icon: '🌈',
            subgenre: 'Hard Magic Fantasy',
            recommendations: ['Hard magic system books']
        },

        // MODERN EPIC FANTASY
        {
            id: 'dragonbone-chair',
            title: 'The Dragonbone Chair',
            author: 'Tad Williams',
            type: 'decision',
            x: 50,
            y: 25,
            description: 'Absolute sleeper slowburn staple of the genre. Modern-ish epic fantasy that is darker in tone without being boiling death. Follow a lowly kitchen boy as the realm descends into chaos.',
            quote: '"An absolute sleeper slowburn staple of the genre that has been putting out quality content for decades."',
            videoTimestamp: '605',
            icon: '🐉',
            decisions: [
                {
                    question: 'Love this transitional modern/classic mix?',
                    nextNode: 'eye-of-the-world',
                    direction: 'perfect-mix'
                },
                {
                    question: 'Want it darker?',
                    nextNode: 'game-of-thrones',
                    direction: 'darker'
                },
                {
                    question: 'Want less epic, more modern?',
                    nextNode: 'mistborn',
                    direction: 'more-modern'
                }
            ]
        },

        {
            id: 'eye-of-the-world',
            title: 'The Eye of the World',
            author: 'Robert Jordan',
            type: 'book',
            x: 55,
            y: 30,
            mustRead: true,
            description: 'If the transitional time where we still have the higher, nicer writing of classic fantasy, but also get the more relatable human characters of modern appeals to you, this is your spot.',
            quote: '"And if, like me, this is spot on to scratching your itch, you\'re just going to go ahead and continue to read The Wheel of Time. And once you finish, you\'re going to have a hollowness in your chest that you can never fill."',
            videoTimestamp: '672',
            icon: '🌀',
        },

        // GRIM DARK PATH
        {
            id: 'game-of-thrones',
            title: 'A Game of Thrones',
            author: 'George R.R. Martin',
            type: 'decision',
            x: 45,
            y: 15,
            description: 'We all know the story of Westeros. The quintessential grim dark political fantasy.',
            videoTimestamp: '712',
            icon: '⚔️',
            decisions: [
                {
                    question: 'Want less sword and sorcery, but equally dark?',
                    nextNode: 'blade-itself',
                    direction: 'less-magic'
                },
                {
                    question: 'Want it darker?',
                    nextNode: 'black-company',
                    direction: 'darker'
                },
                {
                    question: 'Enjoyed the sexy parts?',
                    nextNode: 'kushiels-dart',
                    direction: 'romantic'
                },
                {
                    question: 'Just the right touch of dark?',
                    nextNode: 'elric-melnibone',
                    direction: 'perfect-dark'
                }
            ]
        },

        {
            id: 'blade-itself',
            title: 'The Blade Itself',
            author: 'Joe Abercrombie',
            type: 'book',
            x: 40,
            y: 10,
            description: 'Grim dark fantasy with less magic. Political intrigue with a slight fantasy backdrop. Takes tropes and twists them - one protagonist is a torturer and you\'ll love him.',
            quote: '"For example, one of the main protagonists is a torturer and you\'ll love him. Joeby makes you love horrible people. It\'s a knack he has."',
            videoTimestamp: '727',
            icon: '🗡️',
        },

        {
            id: 'black-company',
            title: 'The Black Company',
            author: 'Glen Cook',
            type: 'subgenre',
            x: 45,
            y: 5,
            description: 'The darkest fantasy book ever. Follows a mercenary band hired by evil people. Very realistic walkthrough of what that would entail.',
            quote: '"And I can\'t go more deep than that without getting demonetized on YouTube. But there is all that happens here... I admit it\'s a great book, but that\'s too far for me, dog."',
            videoTimestamp: '794',
            icon: '💀',
            subgenre: 'Grim Dark',
            recommendations: ['Berserk (manga)', 'Other grim dark fantasy']
        },

        {
            id: 'kushiels-dart',
            title: "Kushiel's Dart",
            author: 'Jacqueline Carey',
            type: 'subgenre',
            x: 35,
            y: 12,
            description: 'The grand papa mama of romantasy. Treats sex like a magic system and is a well worth reading fantasy epic. Few trigger warnings - look them up.',
            quote: '"Congratulations. If you like Kushiel\'s Dart, you\'re definitely going to add romantasy to your stockpile of subgenres you enjoy."',
            videoTimestamp: '862',
            icon: '🌹',
            subgenre: 'Romantasy',
            recommendations: ['ACOTAR', 'other romantasy']
        },

        // DARK EPIC PATH
        {
            id: 'elric-melnibone',
            title: 'Elric of Melniboné',
            author: 'Michael Moorcock',
            type: 'decision',
            x: 50,
            y: 20,
            description: 'Slightly more modern than Dragonbone Chair. Deeply psychological focused story of what it means to be someone with incredible power and moral failings. Features a soul-stealing sword.',
            quote: '"I really think this is a special book. I recently read it and it has a beautiful mix of high epic fantasy with a more human perspective on it."',
            videoTimestamp: '905',
            icon: '⚡',
            decisions: [
                {
                    question: 'Want even higher fantasy?',
                    nextNode: 'gardens-of-the-moon',
                    direction: 'higher'
                }
            ]
        },

        {
            id: 'gardens-of-the-moon',
            title: 'Gardens of the Moon',
            author: 'Steven Erikson',
            type: 'decision',
            x: 55,
            y: 15,
            mustRead: false,
            description: 'The story of everything. Not one cohesive narrative - by book 10 you realize it\'s been happening on a wider meta level. Erikson is a genius.',
            quote: '"Don\'t worry, you will be confused. Eventually, you\'ll love it. Why do I say that about Malazan? Because a lot of these are stories of a country, a chosen one, a nation. Malazan\'s the story of everything."',
            videoTimestamp: '1039',
            icon: '🌍',
            decisions: [
                {
                    question: 'Want something more stylized and modern with punk tone?',
                    nextNode: 'empire-of-the-vampire',
                    direction: 'stylized'
                },
                {
                    question: 'Ready for something different and special?',
                    nextNode: 'dandelion-dynasty',
                    direction: 'silkpunk'
                }
            ]
        },

        {
            id: 'empire-of-the-vampire',
            title: 'Empire of the Vampire',
            author: 'Jay Kristoff',
            type: 'book',
            x: 60,
            y: 12,
            description: 'Story of Gabriel, a defeated silver saint recounting his life to a vampire holding him prisoner. Much more stylized - will not be everyone\'s cup of tea and that\'s intentional.',
            videoTimestamp: '1108',
            icon: '🦇',
        },

        {
            id: 'dandelion-dynasty',
            title: 'The Grace of Kings',
            author: 'Ken Liu',
            type: 'book',
            x: 58,
            y: 18,
            mustRead: true,
            description: 'Silkpunk fantasy starting at high epic level. You think you\'re watching rise and fall of kingdoms, then you zoom out - it\'s the story of a continent. Truly special and different.',
            quote: '"Basically, if even a third of the stuff in here appeals to you, once you\'ve gotten through it, go ahead and do yourself a favor and check out Dandelion Dynasty. Ken Liu crafted something truly special and different."',
            videoTimestamp: '1154',
            icon: '🎋',
        },

        // YA FANTASY PATH
        {
            id: 'old-kingdom',
            title: 'Sabriel',
            author: 'Garth Nix',
            type: 'decision',
            x: 15,
            y: 45,
            description: 'A YA story that treats its audience as mature. Magic deals in death. Themes of handling trauma of losing someone, coming to grips with mortality, and burden of duty.',
            quote: '"I think this is one of the best, if not the best YA epics ever, and an absolute recommendation for pretty much anyone who just wants to feel like they are a well-rounded fantasy reader."',
            videoTimestamp: '1189',
            icon: '🔔',
            decisions: [
                {
                    question: 'Enjoyed fairy tale elements and surreal magic?',
                    nextNode: 'last-unicorn',
                    direction: 'fairy-tale'
                },
                {
                    question: 'Like the YA angle?',
                    nextNode: 'six-of-crows',
                    direction: 'more-ya'
                }
            ]
        },

        {
            id: 'last-unicorn',
            title: 'The Last Unicorn',
            author: 'Peter S. Beagle',
            type: 'subgenre',
            x: 10,
            y: 50,
            description: 'If the fairy tale angles tickled you - the weird surreal elements, animal companions, unexplained elements of magic.',
            videoTimestamp: '1263',
            icon: '🦄',
            subgenre: 'Fairy Tale Fantasy',
        },

        {
            id: 'six-of-crows',
            title: 'Six of Crows',
            author: 'Leigh Bardugo',
            type: 'decision',
            x: 20,
            y: 50,
            description: 'Interesting world building based in Russian lore and mythos. Super popular with a banging series.',
            videoTimestamp: '1327',
            icon: '🎭',
            decisions: [
                {
                    question: 'Want more high fantasy YA?',
                    nextNode: 'eragon',
                    direction: 'high-fantasy'
                }
            ]
        },

        {
            id: 'eragon',
            title: 'Eragon',
            author: 'Christopher Paolini',
            type: 'subgenre',
            x: 25,
            y: 55,
            description: 'If you want to go back to more high fantasy. Over 25? Let\'s be honest, you\'ve read that.',
            quote: '"You have the curse of endless choices. More fantasy books are published in this space than any other genre. So, you\'re never going to catch up."',
            videoTimestamp: '1363',
            icon: '🐲',
            subgenre: 'YA Fantasy',
            recommendations: ['Song of Achilles']
        },

        // URBAN/ALTERNATIVE FANTASY PATH (NORTH)
        {
            id: 'golden-compass',
            title: 'The Golden Compass',
            author: 'Philip Pullman',
            type: 'decision',
            x: 50,
            y: 65,
            description: 'Alternative close-world setting with real world elements. Full of commentary. Follow Lyra and her daemon investigating mystery of her lineage, Dust, and other worlds.',
            videoTimestamp: '1386',
            icon: '🧭',
            decisions: [
                {
                    question: 'Want even more real-world fantasy?',
                    nextNode: 'the-magicians',
                    direction: 'more-real'
                },
                {
                    question: 'Liked the commentary, want adult version?',
                    nextNode: 'perdido-street-station',
                    direction: 'new-weird'
                },
                {
                    question: 'Liked that it starts at Oxford - academia?',
                    nextNode: 'ninth-house',
                    direction: 'academia'
                }
            ]
        },

        {
            id: 'the-magicians',
            title: 'The Magicians',
            author: 'Lev Grossman',
            type: 'decision',
            x: 55,
            y: 70,
            description: 'Academic setting in the real world. Learning magic in a school. Some "I don\'t like society, I\'m a special boy" vibes done well.',
            videoTimestamp: '1422',
            icon: '🎓',
            decisions: [
                {
                    question: 'Want even more real-world, maybe epic?',
                    nextNode: 'dresden-files',
                    direction: 'urban-epic'
                }
            ]
        },

        {
            id: 'dresden-files',
            title: 'Storm Front',
            author: 'Jim Butcher',
            type: 'subgenre',
            x: 60,
            y: 75,
            description: 'Real world epic urban fantasy. Fair warning: it\'s hornier.',
            quote: '"If you enjoy the Dresden Files, congratulations. You just like urban fantasy. And a note from Kayla: From here, you should read Anita Blake... it is important that you learn fantasy authors will eventually disappoint you."',
            videoTimestamp: '1448',
            icon: '🔥',
            subgenre: 'Urban Fantasy',
            recommendations: ['Anita Blake', 'Magic Bites']
        },

        // NEW WEIRD / ACADEMIA
        {
            id: 'perdido-street-station',
            title: 'Perdido Street Station',
            author: 'China Miéville',
            type: 'decision',
            x: 45,
            y: 70,
            description: 'New Weird genre. Takes possibilities of fantasy and does political commentary. Energy crisis, crime organizations, prejudice in a world with bug people. Bizarre.',
            quote: '"Listen, listen. There\'s good logic behind this. It is a wonderful filter... And if you like it, congratulations. Go read New Weird. You\'re my favorite type of freak."',
            videoTimestamp: '1510',
            icon: '🦋',
            decisions: [
                {
                    question: 'What the...? Too weird.',
                    nextNode: 'green-bone-saga',
                    direction: 'more-traditional'
                },
                {
                    question: 'Liked the sci-fantasy aspects?',
                    nextNode: 'green-bone-saga',
                    direction: 'sci-fantasy'
                }
            ]
        },

        {
            id: 'ninth-house',
            title: 'Ninth House',
            author: 'Leigh Bardugo',
            type: 'decision',
            x: 48,
            y: 75,
            description: 'Dark academia mystery. Young investigative woman looking into dark underground societies within academic setting. Surprisingly dark but not too much.',
            videoTimestamp: '1830',
            icon: '🏛️',
            decisions: [
                {
                    question: 'Want it from horny male perspective?',
                    nextNode: 'dresden-files',
                    direction: 'different-perspective'
                },
                {
                    question: 'Want to test dark academic tastes more?',
                    nextNode: 'deadly-education',
                    direction: 'more-academia'
                }
            ]
        },

        {
            id: 'deadly-education',
            title: 'A Deadly Education',
            author: 'Naomi Novik',
            type: 'decision',
            x: 52,
            y: 80,
            description: 'Really popular dark academia. Gateway to see if you like romance in your fantasy.',
            videoTimestamp: '1860',
            icon: '📚',
            decisions: [
                {
                    question: 'Like the romance angles?',
                    nextNode: 'magic-bites',
                    direction: 'romantasy'
                },
                {
                    question: 'Just the academia?',
                    nextNode: 'blood-over-bright-haven',
                    direction: 'just-academia'
                }
            ]
        },

        {
            id: 'magic-bites',
            title: 'Magic Bites',
            author: 'Ilona Andrews',
            type: 'subgenre',
            x: 56,
            y: 85,
            description: 'Urban romantasy fan territory.',
            videoTimestamp: '1878',
            icon: '💋',
            subgenre: 'Urban Romantasy',
        },

        {
            id: 'blood-over-bright-haven',
            title: 'Blood Over Bright Haven',
            author: 'M.L. Wang',
            type: 'subgenre',
            x: 48,
            y: 85,
            description: 'Alternative dark academia recommendation. Those who enjoy this space have been raving about this book.',
            videoTimestamp: '1914',
            icon: '🩸',
            subgenre: 'Dark Academia',
        },

        // URBAN EPIC PATH
        {
            id: 'green-bone-saga',
            title: 'Jade City',
            author: 'Fonda Lee',
            type: 'decision',
            x: 40,
            y: 75,
            mustRead: true,
            description: 'The best urban fantasy epic ever. Pitched as Reservoir Dogs meets Godfather meets Kill Bill. Corruption arcs, generational change, family tearing us apart, syndicate warfare.',
            quote: '"You will see characters make horrendous decisions and love them for it while your heart breaks from their actions... Absolutely definitely read this one."',
            videoTimestamp: '1958',
            icon: '💎',
            decisions: [
                {
                    question: 'Want something less epic but urban fantasy?',
                    nextNode: 'divine-rivals',
                    direction: 'less-epic'
                },
                {
                    question: 'Want same epic scale but darker?',
                    nextNode: 'dark-tower',
                    direction: 'darker-epic'
                },
                {
                    question: 'Perfect level of epic, want commentary?',
                    nextNode: 'fifth-season',
                    direction: 'more-commentary'
                }
            ]
        },

        {
            id: 'divine-rivals',
            title: 'Divine Rivals',
            author: 'Rebecca Ross',
            type: 'decision',
            x: 35,
            y: 80,
            description: 'Less epic than Green Bone Saga. Two people communicating through magical typewriters with mythos around gods in WWI-ish setting. Has romance angle.',
            videoTimestamp: '2011',
            icon: '✉️',
            decisions: [
                {
                    question: 'Like the alternative setting?',
                    nextNode: 'middlegame',
                    direction: 'alt-fantasy'
                }
            ]
        },

        {
            id: 'middlegame',
            title: 'Middlegame',
            author: 'Seanan McGuire',
            type: 'subgenre',
            x: 30,
            y: 85,
            description: 'For alt fantasy fans.',
            videoTimestamp: '2031',
            icon: '♟️',
            subgenre: 'Alt Fantasy',
            recommendations: ['LAMBDA']
        },

        {
            id: 'fifth-season',
            title: 'The Fifth Season',
            author: 'N.K. Jemisin',
            type: 'book',
            x: 40,
            y: 70,
            mustRead: true,
            description: 'Widely considered one of the best fantasy epics of the modern era. Lots of interesting play with narrative and perspective while commenting on topics large and small.',
            videoTimestamp: '2023',
            icon: '🌋',
        },

        {
            id: 'dark-tower',
            title: 'The Gunslinger',
            author: 'Stephen King',
            type: 'decision',
            x: 35,
            y: 70,
            description: 'Dark epic urban fantasy with one of the best opening lines ever. Follow the gunslinger as he jumps through worlds and Stephen King stories hunting the man in black.',
            quote: '"It is a controversial series for its ending. It\'s also going to be adapted hopefully before too long by Mike Flanagan."',
            videoTimestamp: '2051',
            icon: '🔫',
            decisions: [
                {
                    question: 'Want less epic but enjoy the horror?',
                    nextNode: 'pet-sematary',
                    direction: 'horror'
                }
            ]
        },

        {
            id: 'pet-sematary',
            title: 'Pet Sematary',
            author: 'Stephen King',
            type: 'decision',
            x: 30,
            y: 68,
            description: 'Because the author\'s a horror writer. Classic King horror.',
            videoTimestamp: '2091',
            icon: '⚰️',
            decisions: [
                {
                    question: 'Want even more horrific?',
                    nextNode: 'something-wicked',
                    direction: 'more-horror'
                },
                {
                    question: 'Too horrific, but want darker space?',
                    nextNode: 'gideon-ninth',
                    direction: 'dark-not-horror'
                }
            ]
        },

        {
            id: 'something-wicked',
            title: 'Something Wicked This Way Comes',
            author: 'Ray Bradbury',
            type: 'subgenre',
            x: 27,
            y: 65,
            description: 'Not nearly as scary as Pet Sematary, but if you like spooky vibes, there\'s really not much better.',
            videoTimestamp: '2102',
            icon: '🎪',
            subgenre: 'Fantasy Horror',
        },

        {
            id: 'gideon-ninth',
            title: 'Gideon the Ninth',
            author: 'Tamsyn Muir',
            type: 'book',
            x: 32,
            y: 73,
            description: 'For darker space fans and alt fantasy fans. Also good for Empire of the Vampire fans.',
            quote: '"And if after all these recommendations, you still didn\'t even like Gideon the Ninth, I\'m sorry. I cannot help you anymore."',
            videoTimestamp: '2119',
            icon: '💀',
        },

        // MODERN FANTASY PATH
        {
            id: 'will-of-the-many',
            title: 'The Will of the Many',
            author: 'James Islington',
            type: 'decision',
            x: 58,
            y: 60,
            description: 'Based on classical culture. Epic scale, telling its own story, tackling tropes with interesting spins. Non-medieval fantasy. Feeling that you can trust nobody.',
            videoTimestamp: '2175',
            icon: '🏺',
            decisions: [
                {
                    question: 'Like the modern stylization with epic angles?',
                    nextNode: 'orconomics',
                    direction: 'modern-fan'
                }
            ]
        },

        {
            id: 'orconomics',
            title: 'Orconomics',
            author: 'J. Zachary Pike',
            type: 'book',
            x: 62,
            y: 58,
            description: 'A drunken frat bro best friend that you didn\'t like at first, but then you realize he\'s really smart. When he drunkenly belts out facts about economics, he\'s usually right and charismatic.',
            quote: '"Your best friend is a drunken frat bro that at first you didn\'t like, but then you realize he\'s really smart."',
            videoTimestamp: '2284',
            icon: '💰',
            subgenre: 'Modern Fantasy',
        },

        // STRANGE/SURREAL FANTASY
        {
            id: 'alice-wonderland',
            title: 'Alice in Wonderland',
            author: 'Lewis Carroll',
            type: 'decision',
            x: 12,
            y: 52,
            description: 'If you liked the weirder elements of Old Kingdom. A classic everyone should pick up.',
            videoTimestamp: '2341',
            icon: '🐰',
            decisions: [
                {
                    question: 'Tickled your fancy?',
                    nextNode: 'little-prince',
                    direction: 'more-strange'
                }
            ]
        },

        {
            id: 'little-prince',
            title: 'The Little Prince',
            author: 'Antoine de Saint-Exupéry',
            type: 'decision',
            x: 8,
            y: 55,
            description: 'Aimed towards younger audiences but still some of the best literature of its time.',
            videoTimestamp: '2358',
            icon: '👑',
            decisions: [
                {
                    question: 'Ready for surreal fantasy?',
                    nextNode: 'piranesi',
                    direction: 'surreal'
                }
            ]
        },

        {
            id: 'piranesi',
            title: 'Piranesi',
            author: 'Susanna Clarke',
            type: 'subgenre',
            x: 5,
            y: 58,
            mustRead: true,
            description: 'A surreal fantasy story. Go in knowing nothing and be aware that you\'re supposed to be confused. The narrator is unreliable. The setting\'s unreliable. Everybody\'s a suspect.',
            quote: '"If you don\'t read Piranesi, I will show up at your house and shoot you. I\'m kidding. Read Piranesi. It\'s so good."',
            videoTimestamp: '2378',
            icon: '🏛️',
            subgenre: 'Strange Fantasy',
        },

        {
            id: 'song-of-achilles',
            title: 'The Song of Achilles',
            author: 'Madeline Miller',
            type: 'book',
            x: 20,
            y: 55,
            description: 'A reimagining of the story of Achilles. Fantastic for YA fans and those who like classical-based fantasy.',
            videoTimestamp: '2239',
            icon: '🏛️',
        },
    ],

    // Define connections between nodes
    connections: [
        // From The Hobbit
        { from: 'the-hobbit', to: 'wizard-earthsea', type: 'solid', label: 'Love the lore' },
        { from: 'the-hobbit', to: 'golden-compass', type: 'solid', label: 'Not so much dragons' },

        // From Wizard of Earthsea
        { from: 'wizard-earthsea', to: 'small-gods', type: 'solid', label: 'Lighter escapism' },
        { from: 'wizard-earthsea', to: 'dragonbone-chair', type: 'solid', label: 'Darker' },

        // Cozy path
        { from: 'small-gods', to: 'narnia', type: 'solid', label: 'Light & classic' },
        { from: 'small-gods', to: 'mistborn', type: 'solid', label: 'No comedy' },
        { from: 'narnia', to: 'legends-lattes', type: 'solid', label: 'Cozier' },
        { from: 'narnia', to: 'old-kingdom', type: 'solid', label: 'YA angle' },
        { from: 'narnia', to: 'mistborn', type: 'solid', label: 'Less light' },
        { from: 'legends-lattes', to: 'house-cerulean-sea', type: 'solid', label: 'Even cozier' },

        // Hard magic path
        { from: 'mistborn', to: 'shadow-what-was-lost', type: 'solid', label: 'Hard magic' },
        { from: 'mistborn', to: 'dragonbone-chair', type: 'dotted', label: 'More epic' },
        { from: 'mistborn', to: 'elric-melnibone', type: 'dotted', label: 'More challenging' },
        { from: 'shadow-what-was-lost', to: 'black-prism', type: 'solid', label: 'Harder' },

        // Epic fantasy path
        { from: 'dragonbone-chair', to: 'eye-of-the-world', type: 'solid', label: 'Perfect mix' },
        { from: 'dragonbone-chair', to: 'game-of-thrones', type: 'solid', label: 'Darker' },
        { from: 'dragonbone-chair', to: 'mistborn', type: 'dotted', label: 'More modern' },

        // Grim dark path
        { from: 'game-of-thrones', to: 'blade-itself', type: 'solid', label: 'Less magic' },
        { from: 'game-of-thrones', to: 'black-company', type: 'solid', label: 'Darker' },
        { from: 'game-of-thrones', to: 'kushiels-dart', type: 'solid', label: 'Sexy' },
        { from: 'game-of-thrones', to: 'elric-melnibone', type: 'solid', label: 'Right darkness' },

        // Dark epic path
        { from: 'elric-melnibone', to: 'gardens-of-the-moon', type: 'solid', label: 'Higher fantasy' },
        { from: 'gardens-of-the-moon', to: 'empire-of-the-vampire', type: 'solid', label: 'Stylized' },
        { from: 'gardens-of-the-moon', to: 'dandelion-dynasty', type: 'solid', label: 'Silkpunk' },

        // YA path
        { from: 'old-kingdom', to: 'last-unicorn', type: 'solid', label: 'Fairy tale' },
        { from: 'old-kingdom', to: 'six-of-crows', type: 'solid', label: 'More YA' },
        { from: 'six-of-crows', to: 'eragon', type: 'solid', label: 'High fantasy YA' },
        { from: 'old-kingdom', to: 'song-of-achilles', type: 'dotted', label: 'Recommended' },
        { from: 'old-kingdom', to: 'alice-wonderland', type: 'solid', label: 'Weirder elements' },

        // Strange fantasy path
        { from: 'alice-wonderland', to: 'little-prince', type: 'solid', label: 'Enjoyed it' },
        { from: 'little-prince', to: 'piranesi', type: 'solid', label: 'Go surreal' },

        // Urban fantasy path
        { from: 'golden-compass', to: 'the-magicians', type: 'solid', label: 'More real world' },
        { from: 'golden-compass', to: 'perdido-street-station', type: 'solid', label: 'Adult + commentary' },
        { from: 'golden-compass', to: 'ninth-house', type: 'solid', label: 'Academia' },
        { from: 'the-magicians', to: 'dresden-files', type: 'solid', label: 'More real world' },

        // Academia path
        { from: 'ninth-house', to: 'dresden-files', type: 'dotted', label: 'Male POV' },
        { from: 'ninth-house', to: 'deadly-education', type: 'solid', label: 'More academia' },
        { from: 'deadly-education', to: 'magic-bites', type: 'solid', label: 'Romance' },
        { from: 'deadly-education', to: 'blood-over-bright-haven', type: 'solid', label: 'Just academia' },

        // Urban epic path
        { from: 'perdido-street-station', to: 'green-bone-saga', type: 'solid', label: 'More traditional' },
        { from: 'green-bone-saga', to: 'divine-rivals', type: 'solid', label: 'Less epic' },
        { from: 'green-bone-saga', to: 'dark-tower', type: 'solid', label: 'Darker epic' },
        { from: 'green-bone-saga', to: 'fifth-season', type: 'solid', label: 'Commentary' },
        { from: 'divine-rivals', to: 'middlegame', type: 'solid', label: 'Alt setting' },
        { from: 'dark-tower', to: 'pet-sematary', type: 'solid', label: 'Horror' },
        { from: 'pet-sematary', to: 'something-wicked', type: 'solid', label: 'More horror' },
        { from: 'pet-sematary', to: 'gideon-ninth', type: 'solid', label: 'Dark not horror' },

        // Modern fantasy path
        { from: 'eye-of-the-world', to: 'will-of-the-many', type: 'dotted', label: 'Modern epic' },
        { from: 'will-of-the-many', to: 'orconomics', type: 'solid', label: 'Modern fan' },

        // Cross-connections (dotted)
        { from: 'legends-lattes', to: 'green-bone-saga', type: 'dotted', label: 'Starred pick' },
        { from: 'empire-of-the-vampire', to: 'gideon-ninth', type: 'dotted', label: 'Also try' },
        { from: 'mistborn', to: 'eye-of-the-world', type: 'dotted', label: 'Also good' },
    ]
};

// Helper function to get node by ID
function getNodeById(id) {
    return fantasyData.nodes.find(node => node.id === id);
}

// Helper function to get connections for a node
function getNodeConnections(nodeId) {
    return fantasyData.connections.filter(conn =>
        conn.from === nodeId || conn.to === nodeId
    );
}

// Helper function to get next nodes
function getNextNodes(nodeId) {
    return fantasyData.connections
        .filter(conn => conn.from === nodeId)
        .map(conn => getNodeById(conn.to));
}
