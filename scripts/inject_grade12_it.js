// Grade 12 Information Technology (IT) Final Examination (exam_90)
// Authentic curriculum questions strictly aligned with Ethiopian Grade 12 IT Curriculum:
// Information systems, relational databases (SQL, normalization), networking & OSI, cybersecurity, algorithms & web development

const grade12ItQuestions = [
  // --- Section 1: True / False ---
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "A primary key in a relational database table can accept null values as long as other attributes are unique.",
    options: ["True", "False"],
    correctAnswer: 1, // False
    explanation: "According to the entity integrity constraint, primary key attributes must be unique and cannot contain NULL values.",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "In symmetric-key encryption, both the sender and the receiver use the exact same secret key to encrypt and decrypt data.",
    options: ["True", "False"],
    correctAnswer: 0, // True
    explanation: "Symmetric encryption (such as AES) utilizes a single shared secret key for both encryption and decryption operations.",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "The Network Layer (Layer 3) of the OSI model is responsible for logical addressing (IP addresses) and routing packets across subnets.",
    options: ["True", "False"],
    correctAnswer: 0, // True
    explanation: "Layer 3 handles packet forwarding, host logical addressing, and path determination through routers.",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "An IPv6 address consists of 32 bits divided into four decimal octets separated by dots.",
    options: ["True", "False"],
    correctAnswer: 1, // False
    explanation: "IPv4 is 32 bits (4 octets in dotted decimal); IPv6 is 128 bits represented in 8 hexadecimal groups separated by colons.",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "In Object-Oriented Programming, Encapsulation refers to wrapping data (fields) and methods operating on that data into a single unit (class).",
    options: ["True", "False"],
    correctAnswer: 0, // True
    explanation: "Encapsulation restricts direct outside access to internal object states and couples methods with state variables.",
    points: 1
  },

  // --- Section 2: Multiple Choice Questions ---
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "Which of the following SQL commands is categorized as Data Definition Language (DDL)?",
    options: [
      "SELECT",
      "INSERT",
      "CREATE",
      "UPDATE"
    ],
    correctAnswer: 2,
    explanation: "DDL commands define and modify database schema structures, including CREATE, ALTER, and DROP. SELECT and INSERT are DML.",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "In relational database design, a relation is in Second Normal Form (2NF) if it is in 1NF and:",
    options: [
      "Every non-prime attribute is fully functionally dependent on the entire primary key (no partial dependencies)",
      "It contains no multi-valued attributes",
      "There are no transitive functional dependencies",
      "All foreign keys reference valid tables"
    ],
    correctAnswer: 0,
    explanation: "2NF eliminates partial dependencies where a non-key attribute depends on only part of a composite primary key.",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "Which SQL clause is used to filter records resulting from aggregate functions (such as COUNT, AVG, SUM)?",
    options: [
      "WHERE",
      "HAVING",
      "ORDER BY",
      "GROUP BY"
    ],
    correctAnswer: 1,
    explanation: "HAVING filters groups created by GROUP BY based on aggregated calculations, whereas WHERE filters individual rows prior to grouping.",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "In the TCP/IP suite, which protocol provides connection-oriented, reliable, and error-checked byte stream delivery?",
    options: [
      "UDP (User Datagram Protocol)",
      "TCP (Transmission Control Protocol)",
      "IP (Internet Protocol)",
      "ICMP (Internet Control Message Protocol)"
    ],
    correctAnswer: 1,
    explanation: "TCP uses a three-way handshake, sequence numbers, and acknowledgments to ensure reliable end-to-end transmission.",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "What standard port number is assigned by default to secure HyperText Transfer Protocol (HTTPS)?",
    options: [
      "21",
      "53",
      "80",
      "443"
    ],
    correctAnswer: 3,
    explanation: "Port 443 is assigned to HTTPS (HTTP over TLS/SSL); HTTP unencrypted is port 80; FTP is 21; DNS is 53.",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "Which social engineering attack tricks users into divulging sensitive credentials by masquerading as a trustworthy entity via fraudulent emails or fake websites?",
    options: [
      "Phishing",
      "Buffer Overflow",
      "DDoS attack",
      "Cross-site scripting (XSS)"
    ],
    correctAnswer: 0,
    explanation: "Phishing uses deceptive emails and cloned web interfaces to steal user passwords, credit card numbers, or session cookies.",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "What type of malware encrypts a victim's files or system storage and demands payment to restore access?",
    options: [
      "Adware",
      "Ransomware",
      "Spyware",
      "Rootkit"
    ],
    correctAnswer: 1,
    explanation: "Ransomware uses strong cryptographic algorithms to lock victim files until a ransom fee (often in cryptocurrency) is paid.",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "Which data structure operates strictly on the Last-In, First-Out (LIFO) principle?",
    options: [
      "Queue",
      "Binary Search Tree",
      "Stack",
      "Linked List"
    ],
    correctAnswer: 2,
    explanation: "A Stack pushes elements onto the top and pops them from the top, following Last-In, First-Out (LIFO). Queues use FIFO.",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "What is the worst-case time complexity of the Binary Search algorithm on a sorted array of n elements?",
    options: [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n²)"
    ],
    correctAnswer: 1,
    explanation: "Binary search repeatedly cuts the search interval in half, achieving O(log n) logarithmic time complexity.",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "In HTML5, which tag is semantic for defining independent, self-contained content such as a blog post or news story?",
    options: [
      "<div>",
      "<article>",
      "<span>",
      "<content>"
    ],
    correctAnswer: 1,
    explanation: "<article> represents an independent piece of syndicatable content that makes sense on its own.",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "In JavaScript, which method is used to attach an event handler function to an HTML DOM element?",
    options: [
      "element.bindEvent()",
      "element.addEventListener()",
      "element.attachHandler()",
      "element.listen()"
    ],
    correctAnswer: 1,
    explanation: "addEventListener(event, callback) registers the specified listener on the EventTarget it is called on.",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "Which OSI model layer is directly concerned with converting digital bitstreams into electrical, optical, or radio physical signals?",
    options: [
      "Physical Layer (Layer 1)",
      "Data Link Layer (Layer 2)",
      "Transport Layer (Layer 4)",
      "Presentation Layer (Layer 6)"
    ],
    correctAnswer: 0,
    explanation: "The Physical Layer defines hardware specifications, cables, connectors, signaling voltages, and frequency transmissions.",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "What database concept ensures that transactions are processed reliably according to ACID properties? What does ACID stand for?",
    options: [
      "Atomicity, Consistency, Isolation, Durability",
      "Authentication, Control, Integrity, Data",
      "Access, Concurrency, Indexing, Delivery",
      "Allocation, Serialization, Iteration, Deletion"
    ],
    correctAnswer: 0,
    explanation: "ACID represents Atomicity (all or nothing), Consistency (preserves valid states), Isolation (independent transactions), and Durability (committed changes persist).",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "Which of the following IP addresses falls into a Private IPv4 range (RFC 1918) reserved for local area networks?",
    options: [
      "8.8.8.8",
      "192.168.1.105",
      "208.67.222.222",
      "172.33.10.1"
    ],
    correctAnswer: 1,
    explanation: "RFC 1918 private IP ranges are 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. 192.168.1.105 is a classic private LAN IP.",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "In software engineering, what phase of the SDLC (System Development Life Cycle) focuses on discovering user requirements and feasibility?",
    options: [
      "System Implementation",
      "System Analysis & Requirements Engineering",
      "Unit Testing",
      "System Maintenance"
    ],
    correctAnswer: 1,
    explanation: "The Analysis phase gathers stakeholder needs, analyzes workflow constraints, and produces Software Requirements Specifications (SRS).",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "In CSS, which layout module allows responsive one-dimensional arrangement of elements along either a row or column axis?",
    options: [
      "CSS Grid",
      "Flexbox (Flexible Box Layout)",
      "Float property",
      "Absolute Positioning"
    ],
    correctAnswer: 1,
    explanation: "Flexbox is designed for 1-dimensional layouts (row or column), while CSS Grid handles 2-dimensional grid layouts.",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "Which network topology connects every computer directly to a central hub, switch, or router?",
    options: [
      "Bus topology",
      "Ring topology",
      "Star topology",
      "Mesh topology"
    ],
    correctAnswer: 2,
    explanation: "In a Star topology, all endpoints connect via dedicated cables to a central network device (switch), preventing single-cable network collapse.",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "What is the primary function of Domain Name System (DNS) in computer networks?",
    options: [
      "To assign dynamic IP addresses to connecting laptops",
      "To translate human-readable domain names (e.g., example.com) into numerical IP addresses",
      "To encrypt passwords stored in browser cookies",
      "To detect malware packets entering network interfaces"
    ],
    correctAnswer: 1,
    explanation: "DNS serves as the phonebook of the Internet, resolving domain names into IP addresses needed for routing.",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "In SQL, what statement is used to remove an entire database table along with its structure, constraints, and data permanently?",
    options: [
      "DELETE TABLE tablename;",
      "TRUNCATE TABLE tablename;",
      "DROP TABLE tablename;",
      "REMOVE tablename;"
    ],
    correctAnswer: 2,
    explanation: "DROP TABLE completely deletes the table definition and all rows. DELETE or TRUNCATE remove rows but keep table structure.",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "Which principle of information security focuses on preventing unauthorized modification, tampering, or deletion of data?",
    options: [
      "Confidentiality",
      "Integrity",
      "Availability",
      "Non-repudiation"
    ],
    correctAnswer: 1,
    explanation: "The CIA triad defines Integrity as ensuring data remains accurate, complete, and protected against unauthorized alterations.",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "What is the decimal equivalent of the binary number (101101)₂?",
    options: [
      "41",
      "45",
      "53",
      "37"
    ],
    correctAnswer: 1,
    explanation: "1×32 + 0×16 + 1×8 + 1×4 + 0×2 + 1×1 = 32 + 8 + 4 + 1 = 45.",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "Which type of software license allows users to view, modify, and redistribute the source code freely?",
    options: [
      "Proprietary / Closed Source",
      "Open Source Software (OSS)",
      "Freeware without source",
      "Commercial Shareware"
    ],
    correctAnswer: 1,
    explanation: "Open Source licenses (such as MIT, GPL, Apache) grant developers rights to inspect, alter, and redistribute source code.",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "In Object-Oriented Programming, the mechanism where a derived child class acquires properties and methods of an existing parent class is:",
    options: [
      "Polymorphism",
      "Inheritance",
      "Abstraction",
      "Overloading"
    ],
    correctAnswer: 1,
    explanation: "Inheritance enables code reuse and hierarchical class design by allowing derived classes to inherit state and behaviors.",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "What device operates at the Data Link Layer (Layer 2) and forwards frames based on physical MAC addresses?",
    options: [
      "Repeater",
      "Network Switch",
      "IP Router",
      "Passive Hub"
    ],
    correctAnswer: 1,
    explanation: "A Layer 2 switch inspects Ethernet frame headers and uses an internal MAC address table to forward frames to specific ports.",
    points: 1
  },
  {
    examId: "exam_90",
    grade: "Grade12",
    subject: "IT",
    semester: "Semester1",
    examType: "Final",
    question: "In web applications, what client-side storage mechanism allows storing key-value pairs that persist across browser sessions until explicitly cleared?",
    options: [
      "sessionStorage",
      "localStorage",
      "PHP Session ID",
      "RAM cache"
    ],
    correctAnswer: 1,
    explanation: "Window.localStorage stores data with no expiration time, remaining even after the browser window is closed.",
    points: 1
  }
];

module.exports = { grade12ItQuestions };
