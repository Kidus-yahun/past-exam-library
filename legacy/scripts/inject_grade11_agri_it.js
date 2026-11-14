// Grade 11 Agriculture & IT Final Examinations (exam_60, exam_66)
// Authentic curriculum questions strictly aligned with Ethiopian Grade 11 Curriculum:

const grade11AgriQuestions = [
  {
    examId: "exam_60",
    grade: "Grade11",
    subject: "Agriculture",
    semester: "Semester1",
    examType: "Final",
    question: "Soil texture refers strictly to the relative proportions of sand, silt, and clay mineral particles.",
    options: ["True", "False"],
    correctAnswer: 0, // True
    explanation: "Soil texture is determined by the percentage of sand (0.05-2 mm), silt (0.002-0.05 mm), and clay (<0.002 mm).",
    points: 1
  },
  {
    examId: "exam_60",
    grade: "Grade11",
    subject: "Agriculture",
    semester: "Semester1",
    examType: "Final",
    question: "Which plant nutrient is primarily responsible for encouraging vigorous root growth and early seedling establishment?",
    options: ["Phosphorus", "Potassium", "Nitrogen", "Iron"],
    correctAnswer: 0, // Phosphorus
    explanation: "Phosphorus stimulates root elongation, cellular division, and early plant vigor.",
    points: 1
  },
  {
    examId: "exam_60",
    grade: "Grade11",
    subject: "Agriculture",
    semester: "Semester1",
    examType: "Final",
    question: "What is the primary function of potassium (K) in physiological plant processes?",
    options: [
      "Regulating stomatal opening and closing and enzymatic activation",
      "Forming structural chlorophyll molecules",
      "Cellulose synthesis in cell walls",
      "Fixing atmospheric nitrogen"
    ],
    correctAnswer: 0,
    explanation: "Potassium acts as an osmotic regulator controlling guard cell turgor for stomatal movement.",
    points: 1
  },
  {
    examId: "exam_60",
    grade: "Grade11",
    subject: "Agriculture",
    semester: "Semester1",
    examType: "Final",
    question: "Which of the following describes broadcast seeding as commonly practiced in smallholder teff cultivation?",
    options: [
      "Scattering seeds uniformly across the soil surface by hand",
      "Planting single seeds in deep 10 cm furrows",
      "Transplanting seedlings from nursery beds",
      "Dropping seeds through a precision mechanical seed drill"
    ],
    correctAnswer: 0,
    explanation: "Broadcasting is the traditional practice of scattering seeds manually over the plowed seedbed.",
    points: 1
  },
  {
    examId: "exam_60",
    grade: "Grade11",
    subject: "Agriculture",
    semester: "Semester1",
    examType: "Final",
    question: "Crop rotation helps control soil-borne pests and diseases primarily by:",
    options: [
      "Breaking the life cycle of host-specific pathogens and parasites",
      "Sterilizing the topsoil with chemical salts",
      "Raising the soil temperature above 60°C",
      "Eliminating the need for rainfall"
    ],
    correctAnswer: 0,
    explanation: "Alternating unrelated botanical crop families deprives host-specific pathogens of suitable host plants.",
    points: 1
  },
  {
    examId: "exam_60",
    grade: "Grade11",
    subject: "Agriculture",
    semester: "Semester1",
    examType: "Final",
    question: "Which of the following livestock breeds is an indigenous Ethiopian zebu cattle breed recognized for draft power in the highlands?",
    options: ["Boran cattle", "Fogera cattle", "Sheko cattle", "Holstein Friesian"],
    correctAnswer: 1, // Fogera
    explanation: "Fogera cattle are adapted to the wetlands and highlands around Lake Tana, noted for draft stamina.",
    points: 1
  },
  {
    examId: "exam_60",
    grade: "Grade11",
    subject: "Agriculture",
    semester: "Semester1",
    examType: "Final",
    question: "What is the gestation period of domestic dairy cattle (cows)?",
    options: ["Approx. 150 days", "Approx. 280-285 days", "Approx. 340 days", "Approx. 115 days"],
    correctAnswer: 1, // 280-285 days
    explanation: "Bovine pregnancy lasts about 9 months (280 to 285 days).",
    points: 1
  },
  {
    examId: "exam_60",
    grade: "Grade11",
    subject: "Agriculture",
    semester: "Semester1",
    examType: "Final",
    question: "Which soil conservation practice consists of building earthen embankments across hillslope contours to trap runoff and silt?",
    options: ["Bund construction (Soil / Stone bunds)", "Downhill ditching", "Clear felling", "Surface burning"],
    correctAnswer: 0,
    explanation: "Soil and stone bunds slow downslope water velocity, trapping detached topsoil and forming natural terraces.",
    points: 1
  },
  {
    examId: "exam_60",
    grade: "Grade11",
    subject: "Agriculture",
    semester: "Semester1",
    examType: "Final",
    question: "In apiculture, the modern moveable-frame beehive that allows non-destructive honey harvesting is known as the:",
    options: ["Langstroth beehive", "Traditional log hive", "Clay pot hive", "Woven straw skep"],
    correctAnswer: 0,
    explanation: "The Langstroth hive utilizes standardized removable frames based on the bee space principle.",
    points: 1
  },
  {
    examId: "exam_60",
    grade: "Grade11",
    subject: "Agriculture",
    semester: "Semester1",
    examType: "Final",
    question: "What is green manuring in sustainable agronomy?",
    options: [
      "Plowing immature green leguminous plants into the soil to improve organic matter and nitrogen",
      "Painting farm equipment green to resist rust",
      "Spraying green copper sulfate fungicide",
      "Spreading fresh uncomposted plastic mulch"
    ],
    correctAnswer: 0,
    explanation: "Green manure crops are incorporated into the soil while still green to supply organic humus and nutrients.",
    points: 1
  }
];

const grade11ItQuestions = [
  {
    examId: "exam_66",
    grade: "Grade11",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "Which computer memory is volatile and loses its content immediately when system power is disconnected?",
    options: ["ROM (Read-Only Memory)", "RAM (Random Access Memory)", "Hard Disk Drive", "Flash USB"],
    correctAnswer: 1, // RAM
    explanation: "RAM is volatile primary memory that requires continuous electrical current to retain stored bits.",
    points: 1
  },
  {
    examId: "exam_66",
    grade: "Grade11",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "What is the fundamental clock speed of modern computer microprocessors typically measured in?",
    options: ["Gigahertz (GHz)", "Megabytes (MB)", "Dots per inch (DPI)", "Bits per second (bps)"],
    correctAnswer: 0, // Gigahertz
    explanation: "CPU frequency is measured in cycles per second; 1 GHz equals one billion clock cycles per second.",
    points: 1
  },
  {
    examId: "exam_66",
    grade: "Grade11",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "Which network transmission medium transmits data signals as modulated pulses of light?",
    options: ["Fiber-optic cable", "Unshielded Twisted Pair (UTP)", "Coaxial cable", "Copper telephone wire"],
    correctAnswer: 0, // Fiber-optic
    explanation: "Optical fibers utilize total internal reflection to transmit data pulses of light across glass cores.",
    points: 1
  },
  {
    examId: "exam_66",
    grade: "Grade11",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "In spreadsheet software (such as MS Excel), what symbol MUST precede every formula?",
    options: ["=", "@", "#", "$"],
    correctAnswer: 0, // =
    explanation: "Formulas in spreadsheet software always begin with an equal sign (=).",
    points: 1
  },
  {
    examId: "exam_66",
    grade: "Grade11",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "Which of the following is an example of System Software?",
    options: ["Microsoft Word", "Google Chrome", "Operating System (e.g. Linux, Windows)", "Adobe Photoshop"],
    correctAnswer: 2, // OS
    explanation: "The Operating System manages hardware resources and provides common services for application programs.",
    points: 1
  },
  {
    examId: "exam_66",
    grade: "Grade11",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "What does HTML stand for in website authoring?",
    options: [
      "HyperText Markup Language",
      "High Technical Modern Language",
      "Hyper Transfer Machine Link",
      "Home Tool Management Layout"
    ],
    correctAnswer: 0,
    explanation: "HTML (HyperText Markup Language) is the standard markup language for creating web documents.",
    points: 1
  },
  {
    examId: "exam_66",
    grade: "Grade11",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "Which utility is used to protect a local network by monitoring incoming and outgoing traffic based on security rules?",
    options: ["Firewall", "Defragmenter", "Compiler", "Disk Cleanup"],
    correctAnswer: 0, // Firewall
    explanation: "A firewall filters packets based on predefined port, IP, and protocol security rules.",
    points: 1
  },
  {
    examId: "exam_66",
    grade: "Grade11",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "What is an algorithm in computer programming?",
    options: [
      "A step-by-step unambiguous procedure for solving a computational problem in finite time",
      "A piece of physical computer hardware",
      "A malicious computer virus",
      "A high-resolution display screen"
    ],
    correctAnswer: 0,
    explanation: "An algorithm is a finite sequence of well-defined computer instructions to execute a specific task.",
    points: 1
  },
  {
    examId: "exam_66",
    grade: "Grade11",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "Which of the following represents an image file format supported widely across modern web browsers?",
    options: [".png", ".exe", ".docx", ".dll"],
    correctAnswer: 0, // .png
    explanation: "PNG (Portable Network Graphics) is a standard lossless raster image format for web browsers.",
    points: 1
  },
  {
    examId: "exam_66",
    grade: "Grade11",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "What keyboard shortcut is universally used to copy selected content to the clipboard in most operating systems?",
    options: ["Ctrl + C", "Ctrl + V", "Ctrl + Z", "Ctrl + X"],
    correctAnswer: 0, // Ctrl + C
    explanation: "Ctrl + C copies, Ctrl + V pastes, Ctrl + X cuts, and Ctrl + Z undos.",
    points: 1
  }
];

module.exports = { grade11AgriQuestions, grade11ItQuestions };
