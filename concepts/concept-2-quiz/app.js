// Quiz questions with Daniel's personality
const quizQuestions = [
  {
    id: 1,
    question: "You've just finished a long day. What kind of escape are you looking for?",
    subtext: "Be honest now. No judgment... well, maybe a little.",
    answers: [
      {
        text: "Something cozy and comforting, like a warm blanket",
        description: "Low stakes, high comfort. Maybe an orc opening a coffee shop?",
        scores: { cozy: 3, light: 2, modern: 1 }
      },
      {
        text: "Epic adventure with dragons and world-ending stakes",
        description: "The fate of kingdoms hangs in the balance!",
        scores: { epic: 3, classic: 2, adventure: 2 }
      },
      {
        text: "Dark and gritty realism where no one is safe",
        description: "You want to question whether humanity should be saved.",
        scores: { dark: 3, grimdark: 2, realistic: 2 }
      },
      {
        text: "Smart, contemporary magic in a modern setting",
        description: "Magic schools, urban supernatural societies, that sort of thing.",
        scores: { urban: 3, modern: 2, contemporary: 2 }
      }
    ]
  },
  {
    id: 2,
    question: "How do you feel about magic systems?",
    subtext: "This is important. Your wand might start throbbing.",
    answers: [
      {
        text: "Give me ALL the rules and details!",
        description: "You little freak. You want hard magic systems explained in detail.",
        scores: { hardMagic: 4, analytical: 2, modern: 1 }
      },
      {
        text: "Magic should be mysterious and unexplained",
        description: "The wonder is in not knowing how it works.",
        scores: { classic: 2, mysterious: 2, soft: 2 }
      },
      {
        text: "I don't care about magic, give me politics",
        description: "Scheming, backstabbing, and power plays > fireballs",
        scores: { political: 3, realistic: 2, grimdark: 1 }
      },
      {
        text: "Magic? I'm here for the romance",
        description: "Sex and magic, baby. Romantasy all the way.",
        scores: { romance: 4, romantasy: 3 }
      }
    ]
  },
  {
    id: 3,
    question: "Your favorite character just died horribly. How do you react?",
    subtext: "George R.R. Martin wants to know your location.",
    answers: [
      {
        text: "WHAT?! No! This is terrible! *throws book*",
        description: "You prefer your characters alive and well, thank you very much.",
        scores: { light: 3, cozy: 2, optimistic: 2 }
      },
      {
        text: "Interesting choice. I wonder how this affects the plot...",
        description: "You appreciate bold narrative decisions.",
        scores: { analytical: 2, realistic: 2, mature: 2 }
      },
      {
        text: "YES! This is what I'm talking about!",
        description: "No one is safe. Maximum stakes. You might need therapy.",
        scores: { grimdark: 4, dark: 3, intense: 2 }
      },
      {
        text: "Wait, characters can die in these books?",
        description: "You've been reading cozy fantasy, haven't you?",
        scores: { cozy: 3, light: 2, innocent: 2 }
      }
    ]
  },
  {
    id: 4,
    question: "How do you feel about weird, experimental storytelling?",
    subtext: "People in relationships with bug people. Yes, I'm serious.",
    answers: [
      {
        text: "Bring on the weird! The stranger, the better!",
        description: "Congratulations, you're Daniel's favorite type of freak.",
        scores: { weird: 4, experimental: 3, literary: 2 }
      },
      {
        text: "A little weird is fine, but not too much",
        description: "You like your fantasy with a side of normalcy.",
        scores: { moderate: 2, accessible: 2 }
      },
      {
        text: "I prefer traditional storytelling",
        description: "Classic hero's journey for the win.",
        scores: { classic: 3, traditional: 2, comfortable: 2 }
      },
      {
        text: "What the f***",
        description: "Valid reaction. Let's find you something more grounded.",
        scores: { mainstream: 3, accessible: 2 }
      }
    ]
  },
  {
    id: 5,
    question: "Pick your ideal reading pace:",
    subtext: "Some of us have lives. Others have Brandon Sanderson's Cosmere.",
    answers: [
      {
        text: "Slow burn. Let me savor every page.",
        description: "You appreciate worldbuilding and character development.",
        scores: { literary: 2, patient: 3, immersive: 2 }
      },
      {
        text: "Fast-paced action from page one!",
        description: "No 200-page prologues. Give me excitement NOW.",
        scores: { action: 3, accessible: 2, modern: 1 }
      },
      {
        text: "I'll read 14+ books if the story demands it",
        description: "Your family is going to miss you. See you in 6 months.",
        scores: { epic: 4, committed: 3, obsessive: 2 }
      },
      {
        text: "Something I can finish in a weekend",
        description: "Standalone or shorter series, please.",
        scores: { accessible: 3, casual: 2 }
      }
    ]
  },
  {
    id: 6,
    question: "How important is the romance subplot?",
    subtext: "No judgment. Okay, maybe a little judgment.",
    answers: [
      {
        text: "VERY important. It's why I'm here.",
        description: "You're about to discover romantasy exists and it's glorious.",
        scores: { romance: 4, romantasy: 3, emotional: 2 }
      },
      {
        text: "A nice addition but not the focus",
        description: "Some tension, some payoff, keeps things interesting.",
        scores: { balanced: 2, moderate: 2 }
      },
      {
        text: "Don't care either way",
        description: "You're here for the plot and worldbuilding.",
        scores: { plot: 2, analytical: 1 }
      },
      {
        text: "Please no. Just give me dragons and magic.",
        description: "You're a simple soul with simple needs. Respect.",
        scores: { action: 2, classic: 2, practical: 1 }
      }
    ]
  },
  {
    id: 7,
    question: "Your ideal protagonist is:",
    subtext: "Everyone's the hero of their own story. Except in grimdark. Then everyone sucks.",
    answers: [
      {
        text: "A chosen one destined for greatness",
        description: "Classic prophecy, hero's journey, the whole deal.",
        scores: { classic: 3, epic: 2, traditional: 2 }
      },
      {
        text: "A morally gray anti-hero",
        description: "Heroes are boring. Give me complex, flawed characters.",
        scores: { grimdark: 3, complex: 2, mature: 2 }
      },
      {
        text: "An ordinary person in extraordinary circumstances",
        description: "Relatable characters > special snowflakes",
        scores: { realistic: 3, relatable: 2, modern: 1 }
      },
      {
        text: "Someone just trying to live their life",
        description: "Opening coffee shops, finding love, the simple things.",
        scores: { cozy: 4, slice: 3, wholesome: 2 }
      }
    ]
  },
  {
    id: 8,
    question: "Time period preference?",
    subtext: "Medieval Europe has dominated long enough. There are other options.",
    answers: [
      {
        text: "Classic medieval fantasy all the way",
        description: "If it ain't broke, don't fix it. Castles and swords forever.",
        scores: { classic: 3, medieval: 3, traditional: 2 }
      },
      {
        text: "Give me something different - Asian, African, Indigenous inspired",
        description: "There's a whole world of mythology out there.",
        scores: { diverse: 3, modern: 2, fresh: 2 }
      },
      {
        text: "Modern day with supernatural elements",
        description: "Cities, technology, and magic coexisting.",
        scores: { urban: 4, contemporary: 3, modern: 2 }
      },
      {
        text: "Historical with fantasy elements",
        description: "Real world history + magic = chef's kiss",
        scores: { historical: 3, grounded: 2 }
      }
    ]
  },
  {
    id: 9,
    question: "What's your tolerance for academic/scholarly fantasy?",
    subtext: "Dark academia is trending. Oxford, magic schools, secret societies...",
    answers: [
      {
        text: "Love it! Magic schools and universities!",
        description: "You'd fit right in at a magical academy.",
        scores: { academic: 4, intellectual: 2, urban: 1 }
      },
      {
        text: "It's fine as a setting but not the focus",
        description: "School is cool but don't make it boring.",
        scores: { moderate: 2 }
      },
      {
        text: "I prefer adventures outside of school",
        description: "The real world is where the magic happens.",
        scores: { adventure: 3, action: 2 }
      },
      {
        text: "Keep me far away from anything resembling homework",
        description: "You finished school. You're not going back, even fictionally.",
        scores: { casual: 2, action: 1 }
      }
    ]
  },
  {
    id: 10,
    question: "Final question: What do you want to FEEL when you finish a fantasy book?",
    subtext: "This is what it's all about. Finding that catharsis.",
    answers: [
      {
        text: "Warm, comforted, and ready to sleep peacefully",
        description: "You want fantasy as comfort food.",
        scores: { cozy: 4, wholesome: 3, light: 2 }
      },
      {
        text: "Awed by the scope and epicness of it all",
        description: "You want to feel like you've witnessed something grand.",
        scores: { epic: 4, grandiose: 3, immersive: 2 }
      },
      {
        text: "Emotionally devastated but in a good way",
        description: "You want that beautiful pain. The hollowness in your chest.",
        scores: { emotional: 3, dark: 2, literary: 2 }
      },
      {
        text: "Intellectually stimulated and satisfied",
        description: "You want to think about themes, analyze the plot, discuss with others.",
        scores: { intellectual: 3, analytical: 3, literary: 2 }
      },
      {
        text: "Entertained and ready for the next one!",
        description: "You're a binge reader. You want that page-turner energy.",
        scores: { accessible: 3, engaging: 2, binge: 3 }
      }
    ]
  }
];

// Personality types and results
const personalityTypes = {
  cozyFantasyFan: {
    title: "Cozy Fantasy Fan",
    icon: "☕",
    danielQuote: "If you want cozier than House in the Cerulean Sea, I recommend you buy a blanket and start just reading the threads. Congratulations, you've found your niche!",
    description: "You're here for the vibes. Low stakes, high comfort. You want orcs opening coffee shops, not battling for the fate of the world. There's no judgment here (okay, maybe a little), but you've got endless options in this space.",
    recommendations: [
      "Legends & Lattes by Travis Baldree - The flagship cozy fantasy",
      "The House in the Cerulean Sea by TJ Klune - LGBTQ+ themes and heartwarming found family",
      "A Psalm for the Wild-Built by Becky Chambers - Cozy sci-fi adjacent",
      "The Very Secret Society of Irregular Witches by Sangu Mandanna"
    ],
    traits: { cozy: 10, light: 8, wholesome: 9, lowStakes: 10 }
  },
  hardMagicFan: {
    title: "Hard Magic System Fan",
    icon: "🔮",
    danielQuote: "You little freak. If you read Black Prism and think 'My wand is not even throbbing yet,' then congratulations. You're a hard magic fan and good, I'm happy for you.",
    description: "You need those rules. You need to understand exactly how magic works, its limitations, its costs. You probably make spreadsheets about magic systems. That's okay. We love you.",
    recommendations: [
      "Mistborn by Brandon Sanderson - The gold standard of hard magic",
      "The Black Prism by Brent Weeks - Color-based magic system",
      "The Shadow of What Was Lost by James Islington - Slow burn hard magic",
      "The Name of the Wind by Patrick Rothfuss - Sympathy and naming"
    ],
    traits: { hardMagic: 10, analytical: 9, modern: 7, detail: 10 }
  },
  grimdarkFan: {
    title: "Grimdark Fan",
    icon: "⚔️",
    danielQuote: "If you read Black Company and think 'This is perfect,' congratulations. You found your niche. If you want darker, go to therapy.",
    description: "You want to question whether humanity should be saved. You love morally gray characters making terrible decisions. No one is safe in your books, and that's exactly how you like it.",
    recommendations: [
      "The First Law trilogy by Joe Abercrombie - Master of grimdark",
      "A Song of Ice and Fire by George R.R. Martin - Everyone you love dies",
      "The Black Company by Glen Cook - The darkest",
      "The Poppy War by R.F. Kuang - War crimes and trauma"
    ],
    traits: { dark: 10, grimdark: 10, realistic: 8, intense: 10 }
  },
  urbanFantasyFan: {
    title: "Urban Fantasy Fan",
    icon: "🌃",
    danielQuote: "Congratulations. You just like urban fantasy. There's a lot here for you, and fair warning: The Dresden Files is hornier than you might expect.",
    description: "Magic in the modern world! Cities with supernatural underbellies! You want your wizards using cell phones and fighting vampires in back alleys. It's a whole vibe.",
    recommendations: [
      "The Dresden Files by Jim Butcher - Wizard detective in Chicago",
      "The Magicians by Lev Grossman - Dark magical realism",
      "Kate Daniels series by Ilona Andrews - Magic vs technology",
      "Rivers of London by Ben Aaronovitch - London police + magic"
    ],
    traits: { urban: 10, contemporary: 9, modern: 10, action: 7 }
  },
  epicFantasyFan: {
    title: "Epic Fantasy Fan",
    icon: "🏰",
    danielQuote: "If Eye of the World is spot on for you, you're going to continue reading. And once you finish, you're going to have a hollowness in your chest that you can never fill. But that's the end result of finishing any series you love.",
    description: "You want the SCOPE. Multiple POVs, sprawling continents, detailed histories, and conflicts that span books. You're in it for the long haul, and you wouldn't have it any other way.",
    recommendations: [
      "The Wheel of Time by Robert Jordan - 14+ books of epicness",
      "The Stormlight Archive by Brandon Sanderson - Massive scale and worldbuilding",
      "Malazan Book of the Fallen by Steven Erikson - The ultimate epic",
      "The Dragonbone Chair by Tad Williams - Classic epic fantasy"
    ],
    traits: { epic: 10, immersive: 10, committed: 9, complex: 8 }
  },
  romantasyFan: {
    title: "Romantasy Fan",
    icon: "💖",
    danielQuote: "No judgment here. That's absolutely fine. Few trigger warnings in Kushiel's Dart for sure. Look them up on your own. But if you check this box, it's confounded nuisance, but it's the law - you have to read ACOTAR.",
    description: "You're here for the sexy times AND the magic. Why choose between romance and fantasy when you can have both? You've discovered the best of both worlds.",
    recommendations: [
      "Kushiel's Dart by Jacqueline Carey - The grand parent of romantasy",
      "A Court of Thorns and Roses by Sarah J. Maas - Fae romance",
      "From Blood and Ash by Jennifer L. Armentrout",
      "A Deal with the Elf King by Elise Kova"
    ],
    traits: { romance: 10, romantasy: 10, emotional: 9, spicy: 10 }
  },
  modernFantasyFan: {
    title: "Modern Fantasy Fan",
    icon: "✨",
    danielQuote: "Jack the box. You're a modern fantasy fan. You'll have to make a pit stop at Brandon Sanderson if you haven't already. Yeah, it's the law.",
    description: "You like your fantasy with contemporary sensibilities. Modern prose, diverse perspectives, and themes that resonate with today's world. You probably also appreciate good banter.",
    recommendations: [
      "The Will of the Many by James Islington - Modern epic",
      "Mistborn by Brandon Sanderson - Gateway to Cosmere",
      "Orconomics by J. Zachary Pike - Funny and smart",
      "The Broken Earth trilogy by N.K. Jemisin - Multiple Hugo awards"
    ],
    traits: { modern: 10, contemporary: 8, accessible: 8, diverse: 9 }
  },
  darkAcademiaFan: {
    title: "Dark Academia Fan",
    icon: "📚",
    danielQuote: "If you like Ninth House and Deadly Education, congratulations. You're a dark academia fan. There's a ton here, and you're going to be hearing that term until you want to tear your eyeballs out.",
    description: "Secret societies! Magic schools! Mysterious murders! You want your fantasy with a side of scholarly pursuits and probably some mystery thrown in.",
    recommendations: [
      "Ninth House by Leigh Bardugo - Yale + dark magic",
      "A Deadly Education by Naomi Novik - Survival magic school",
      "The Atlas Six by Olivie Blake - Secret magical society",
      "Blood Over Bright Haven by ML Wang"
    ],
    traits: { academic: 10, intellectual: 9, urban: 7, mystery: 8 }
  },
  newWeirdFan: {
    title: "New Weird Fan (Daniel's Favorite Freak)",
    icon: "🐛",
    danielQuote: "Congratulations, you're Daniel's favorite type of freak. Get your freak on. Don't let nobody stop you.",
    description: "Bug people relationships! Bizarre magic systems! Political commentary wrapped in weird fiction! You're not afraid of the strange and experimental. You probably also love Annihilation.",
    recommendations: [
      "Perdido Street Station by China Miéville - The new weird bible",
      "The City & The City by China Miéville - Overlapping cities",
      "Annihilation by Jeff VanderMeer - Southern Reach trilogy",
      "Piranesi by Susanna Clarke"
    ],
    traits: { weird: 10, experimental: 10, literary: 9, unique: 10 }
  },
  yaFantasyFan: {
    title: "YA Fantasy Fan",
    icon: "📖",
    danielQuote: "You have the curse of endless choices. More fantasy books are published in this space than any other. You're never going to catch up. Sorry. You're suffering from success.",
    description: "You like your fantasy with coming-of-age themes and protagonists you can relate to. The good news: endless options. The bad news: you'll never read them all.",
    recommendations: [
      "Six of Crows by Leigh Bardugo - Heist in the Grishaverse",
      "Sabriel (Old Kingdom) by Garth Nix - Death magic and growing up",
      "The Song of Achilles by Madeline Miller - Greek mythology retelling",
      "Shadow and Bone by Leigh Bardugo"
    ],
    traits: { ya: 10, comingOfAge: 9, accessible: 8, emotional: 7 }
  }
};

// Quiz state
let currentQuestion = 0;
let userScores = {};
let answers = [];

// Initialize quiz
document.getElementById('startQuizBtn').addEventListener('click', startQuiz);
document.getElementById('retakeBtn').addEventListener('click', resetQuiz);
document.getElementById('shareBtn').addEventListener('click', shareResults);

function startQuiz() {
  document.getElementById('welcomeScreen').style.display = 'none';
  document.getElementById('quizScreen').style.display = 'block';
  currentQuestion = 0;
  userScores = {};
  answers = [];
  displayQuestion();
}

function displayQuestion() {
  const question = quizQuestions[currentQuestion];
  const container = document.getElementById('questionContainer');

  // Update progress
  document.getElementById('progressFill').style.width = ((currentQuestion / quizQuestions.length) * 100) + '%';
  document.getElementById('progressText').textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;

  // Build question HTML
  const answersHTML = question.answers.map((answer, index) => `
    <div class="answer-option" onclick="selectAnswer(${index})">
      <div class="answer-text">${answer.text}</div>
      <div class="answer-description">${answer.description}</div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="question-number">Question ${currentQuestion + 1}</div>
    <h2 class="question-text">${question.question}</h2>
    <p class="question-subtext">${question.subtext}</p>
    <div class="answers-grid">
      ${answersHTML}
    </div>
  `;
}

function selectAnswer(answerIndex) {
  const question = quizQuestions[currentQuestion];
  const answer = question.answers[answerIndex];

  // Record answer
  answers.push({
    question: question.question,
    answer: answer.text
  });

  // Add scores
  for (const [trait, score] of Object.entries(answer.scores)) {
    userScores[trait] = (userScores[trait] || 0) + score;
  }

  // Move to next question or show results
  currentQuestion++;
  if (currentQuestion < quizQuestions.length) {
    setTimeout(() => {
      displayQuestion();
    }, 300);
  } else {
    setTimeout(() => {
      showResults();
    }, 300);
  }
}

function calculatePersonality() {
  // Determine personality type based on scores
  const personalityScores = {};

  // Cozy Fantasy Fan
  if (userScores.cozy >= 8) {
    personalityScores.cozyFantasyFan = userScores.cozy + (userScores.light || 0) + (userScores.wholesome || 0);
  }

  // Hard Magic Fan
  if (userScores.hardMagic >= 7) {
    personalityScores.hardMagicFan = userScores.hardMagic + (userScores.analytical || 0);
  }

  // Grimdark Fan
  if (userScores.dark >= 6 || userScores.grimdark >= 5) {
    personalityScores.grimdarkFan = (userScores.dark || 0) + (userScores.grimdark || 0) + (userScores.realistic || 0);
  }

  // Urban Fantasy Fan
  if (userScores.urban >= 7) {
    personalityScores.urbanFantasyFan = userScores.urban + (userScores.contemporary || 0) + (userScores.modern || 0);
  }

  // Epic Fantasy Fan
  if (userScores.epic >= 7) {
    personalityScores.epicFantasyFan = userScores.epic + (userScores.committed || 0) + (userScores.immersive || 0);
  }

  // Romantasy Fan
  if (userScores.romance >= 8 || userScores.romantasy >= 6) {
    personalityScores.romantasyFan = (userScores.romance || 0) + (userScores.romantasy || 0) + (userScores.emotional || 0);
  }

  // Modern Fantasy Fan
  if (userScores.modern >= 6 && !personalityScores.urbanFantasyFan) {
    personalityScores.modernFantasyFan = userScores.modern + (userScores.accessible || 0);
  }

  // Dark Academia Fan
  if (userScores.academic >= 7) {
    personalityScores.darkAcademiaFan = userScores.academic + (userScores.intellectual || 0);
  }

  // New Weird Fan
  if (userScores.weird >= 6 || userScores.experimental >= 5) {
    personalityScores.newWeirdFan = (userScores.weird || 0) + (userScores.experimental || 0) + (userScores.literary || 0);
  }

  // YA Fantasy Fan
  if (userScores.accessible >= 6 && userScores.cozy < 8 && userScores.dark < 6) {
    personalityScores.yaFantasyFan = (userScores.accessible || 0) + (userScores.casual || 0);
  }

  // Find highest score
  let maxScore = 0;
  let personalityType = 'modernFantasyFan'; // Default

  for (const [type, score] of Object.entries(personalityScores)) {
    if (score > maxScore) {
      maxScore = score;
      personalityType = type;
    }
  }

  return personalityType;
}

function showResults() {
  const personalityType = calculatePersonality();
  const result = personalityTypes[personalityType];

  document.getElementById('quizScreen').style.display = 'none';
  document.getElementById('resultsScreen').style.display = 'block';

  // Populate results
  document.getElementById('resultsTitle').textContent = result.title;
  document.querySelector('.badge-icon').textContent = result.icon;

  document.getElementById('danielVerdict').innerHTML = `
    ${result.danielQuote}
    <span class="daniel-verdict-signature">— Daniel Greene</span>
  `;

  document.getElementById('resultsDescription').textContent = result.description;

  // Recommendations
  const recsHTML = result.recommendations.map(rec => `
    <div class="recommendation-card">
      ${rec}
    </div>
  `).join('');
  document.getElementById('recommendationsList').innerHTML = recsHTML;

  // Draw radar chart
  drawRadarChart(result.traits);

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function drawRadarChart(traits) {
  const canvas = document.getElementById('radarChart');
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 150;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const traitNames = Object.keys(traits);
  const traitValues = Object.values(traits);
  const angleStep = (Math.PI * 2) / traitNames.length;

  // Draw background circles
  ctx.strokeStyle = '#e0e0e0';
  ctx.lineWidth = 1;
  for (let i = 1; i <= 5; i++) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, (radius / 5) * i, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Draw axes
  ctx.strokeStyle = '#d0d0d0';
  ctx.lineWidth = 1;
  traitNames.forEach((_, index) => {
    const angle = angleStep * index - Math.PI / 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();
  });

  // Draw labels
  ctx.fillStyle = '#333';
  ctx.font = 'bold 14px Inter';
  ctx.textAlign = 'center';
  traitNames.forEach((name, index) => {
    const angle = angleStep * index - Math.PI / 2;
    const x = centerX + Math.cos(angle) * (radius + 30);
    const y = centerY + Math.sin(angle) * (radius + 30);
    ctx.fillText(name, x, y);
  });

  // Draw user's profile
  ctx.beginPath();
  ctx.fillStyle = 'rgba(107, 70, 193, 0.3)';
  ctx.strokeStyle = '#6b46c1';
  ctx.lineWidth = 3;

  traitValues.forEach((value, index) => {
    const angle = angleStep * index - Math.PI / 2;
    const distance = (value / 10) * radius;
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Draw points
  ctx.fillStyle = '#6b46c1';
  traitValues.forEach((value, index) => {
    const angle = angleStep * index - Math.PI / 2;
    const distance = (value / 10) * radius;
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
  });
}

function resetQuiz() {
  currentQuestion = 0;
  userScores = {};
  answers = [];
  document.getElementById('resultsScreen').style.display = 'none';
  document.getElementById('welcomeScreen').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function shareResults() {
  const personalityType = calculatePersonality();
  const result = personalityTypes[personalityType];

  const shareText = `I'm a ${result.title}! ${result.icon}\n\nTake Daniel Greene's Fantasy Reading Guide quiz to find your perfect fantasy subgenre!`;

  if (navigator.share) {
    navigator.share({
      title: 'My Fantasy Reader Personality',
      text: shareText
    }).catch(err => console.log('Error sharing:', err));
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(shareText).then(() => {
      alert('Results copied to clipboard!');
    });
  }
}
