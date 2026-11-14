// scripts/append_remaining_authentic.js
const fs = require('fs');
const path = require('path');

const newQuestionsCode = `
    // =========================================================================
    // 6. GRADE 9 HISTORY (Semester 1 Mid 1 - exam_132)
    // Physical Paper: Blessed G/Michael Catholic Secondary School 1st Semester History Test One for Grade 9th Oct, 2018 E.C
    // =========================================================================
    // Part I: True / False
    q('q_g9_hist_real_01', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'True or False: Prehistory refers to the period after the invention of writing.',
        ['True', 'False'],
        1,
        'False. Prehistory specifically refers to the period before writing was invented. The period after the invention of writing is recorded history.'
    ),
    q('q_g9_hist_real_02', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'True or False: The Greek word Istoria means "inquiry" or "an account of one\\'s inquiries."',
        ['True', 'False'],
        0,
        'True. The English word history originates from the ancient Greek word "istoria" (inquiry, knowledge acquired by investigation).'
    ),
    q('q_g9_hist_real_03', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'True or False: One of the key aims of history is to help us understand the present.',
        ['True', 'False'],
        0,
        'True. Studying past events, trends, and cause-effect relationships provides essential context for understanding contemporary societies and institutions.'
    ),
    q('q_g9_hist_real_04', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'True or False: Oral sources never need to be verified because they are always accurate.',
        ['True', 'False'],
        1,
        'False. Oral traditions can be distorted by human memory, bias, and selective transmission over generations; historians must rigorously cross-check and verify oral sources.'
    ),
    q('q_g9_hist_real_05', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'True or False: In Ethiopian historiography, history became an academic discipline in the 1960s.',
        ['True', 'False'],
        0,
        'True. Professional academic historiography in Ethiopia was established in the 1960s with the foundation of the Department of History and Institute of Ethiopian Studies at Haile Selassie I University (now Addis Ababa University).'
    ),

    // Part II: Matching
    q('q_g9_hist_real_06', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Which hominid species is known as "The upright man"?',
        ['Homo habilis', 'Homo erectus', 'Homo sapiens', 'Australopithecus afarensis'],
        1,
        'Homo erectus literally translates to "upright man" because it was the first hominid known to walk fully upright and migrate out of Africa.'
    ),
    q('q_g9_hist_real_07', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Which species is classified as "The wise man" and encompasses all modern humans?',
        ['Homo habilis', 'Homo erectus', 'Homo sapiens', 'Ardipithecus ramidus'],
        2,
        'Homo sapiens translates from Latin as "wise man" or "knowing man".'
    ),
    q('q_g9_hist_real_08', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Which of the following historical items serves as a primary archaeological source?',
        ['Monument', 'Modern textbook', 'Historical novel', 'Encyclopedia article'],
        0,
        'Monuments, coins, inscriptions, and fossils are physical primary sources created during the time period under study.'
    ),
    q('q_g9_hist_real_09', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Which of the following is classified as a secondary source of history?',
        ['Eyewitness letter', 'History books', 'Ancient temple inscription', 'Original treaty document'],
        1,
        'History books are secondary sources because they analyze, synthesize, and interpret primary sources after the events took place.'
    ),
    q('q_g9_hist_real_10', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Which early human ancestor is known as "The handy man" due to its use of stone tools?',
        ['Homo habilis', 'Homo erectus', 'Homo sapiens', 'Australopithecus'],
        0,
        'Homo habilis was named "the handy man" by Louis Leakey because fossils were found directly alongside Oldowan stone tools.'
    ),

    // Part III: Multiple Choice
    q('q_g9_hist_real_11', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Which of the following is a secondary source of history?',
        ['History textbook.', 'Ancient coin.', 'Eyewitness diary.', 'Court record.'],
        0,
        'A history textbook is written by researchers who compile and analyze primary sources, making it a secondary source.'
    ),
    q('q_g9_hist_real_12', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Which area of human life is not a direct concern of early history?',
        ['Politics.', 'Music preferences.', 'Shelter.', 'Food.'],
        1,
        'Early human survival and social organisation focused on food gathering/production, shelter, and political organization; individual music preferences are not a direct concern of early history.'
    ),
    q('q_g9_hist_real_13', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Which of the following is a primary source of history?',
        ['A modern textbook.', 'A historical drama.', 'A newspaper article from 2020 about World War II.', 'A letter written during World War I.'],
        3,
        'A letter written during World War I is a direct firsthand primary source from someone living through the event.'
    ),
    q('q_g9_hist_real_14', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'All modern humans belong to the species of _______',
        ['Homo erectus.', 'Australopithecus.', 'Homo sapiens.', 'Homo habilis.'],
        2,
        'All modern humans belong strictly to the species Homo sapiens.'
    ),
    q('q_g9_hist_real_15', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'The term history comes from the Greek word Istoria, which means _______',
        ['Inquiry.', 'Discovery.', 'War.', 'Writing.'],
        0,
        'The ancient Greek term "istoria" means inquiry, investigation, or learning through inquiry.'
    ),
    q('q_g9_hist_real_16', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Thucydides is best known for _______',
        ['Writing legends.', 'Using astrology in history.', 'Promoting factual and critical historical writing.', 'Creating the Ethiopian calendar.'],
        2,
        'The Greek historian Thucydides is celebrated for applying rigorous critical standards, factual evidence, and rejecting supernatural causes in his History of the Peloponnesian War.'
    ),
    q('q_g9_hist_real_17', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Before using historical sources, historians must _______',
        ['Translate them.', 'Burn copies.', 'Decorate them.', 'Critically evaluate their authenticity.'],
        3,
        'Historical methodology requires internal and external criticism to evaluate the authenticity and reliability of sources.'
    ),
    q('q_g9_hist_real_18', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Which of the following is a major aim of studying history?',
        ['To prove myths.', 'To entertain.', 'To predict natural disasters.', 'To understand the present and plan for the future.'],
        3,
        'History aims to illuminate how past decisions shaped modern conditions so societies can plan wisely for the future.'
    ),
    q('q_g9_hist_real_19', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'In the Paleolithic Age, people primarily practice _______',
        ['Farmed land.', 'Hunted and gathered food.', 'Built pyramids.', 'Traded coins.'],
        1,
        'During the Paleolithic (Old Stone Age), humans lived in nomadic bands relying on hunting game and foraging/gathering wild edible plants.'
    ),
    q('q_g9_hist_real_20', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Which of the following is the term for identifying when a historical event happened?',
        ['Mapping.', 'Forecasting.', 'Dating.', 'Excavating.'],
        2,
        'Dating (both relative dating and absolute scientific dating like Carbon-14) determines chronological time in history and archaeology.'
    ),
    q('q_g9_hist_real_21', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'What does prehistory refer to?',
        ['The time after written records.', 'The study of space and time.', 'The history of kings.', 'The time before writing was invented.'],
        3,
        'Prehistory encompasses all of human existence prior to the invention of written documentation.'
    ),
    q('q_g9_hist_real_22', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Neolithic developments in Ethiopia included _______',
        ['Use of bronze weapons.', 'Discovery of writing.', 'Domestication of plants like teff.', 'Construction of castles.'],
        2,
        'The Ethiopian region is recognized as a major Vavilov centre of plant domestication, cultivating indigenous crops like teff, enset, and coffee during the Neolithic era.'
    ),
    q('q_g9_hist_real_23', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Who is known as the Father of History?',
        ['Aristotle.', 'Herodotus.', 'Plato.', 'Socrates.'],
        1,
        'Herodotus of Halicarnassus was first titled "The Father of History" by Cicero for his systematic collection and inquiry of the Greco-Persian wars.'
    ),
    q('q_g9_hist_real_24', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'Leopold Von Ranke is famous for:',
        ['Creating oral traditions.', 'Writing fiction.', 'Introducing scientific methods to historical writing.', 'Writing about the Stone Age.'],
        2,
        'Ranke transformed modern history into a scientific discipline focused on primary archival documents and objective depiction of "wie es eigentlich gewesen" (how it actually happened).'
    ),
    q('q_g9_hist_real_25', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'A period of 1,000 years is known as _______',
        ['Millennium.', 'Decade.', 'Century.', 'Era.'],
        0,
        'A millennium represents 1,000 years (a decade is 10 years, a century is 100 years).'
    ),
    q('q_g9_hist_real_26', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'The Islamic calendar starts counting time from _______',
        ['Birth of Muhammad.', 'Migration to Medina.', 'Death of Muhammad.', 'First Quranic revelation.'],
        1,
        'The Hijri calendar begins in 622 CE when Prophet Muhammad migrated from Mecca to Medina (the Hijrah).'
    ),
    q('q_g9_hist_real_27', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'The famous fossil "Lucy" belongs to the species of _______',
        ['Homo sapiens.', 'Ardipithecus ramidus.', 'Australopithecus afarensis.', 'Homo erectus.'],
        2,
        'Lucy (Dinkinesh), unearthed in Hadar (Afar, Ethiopia) by Donald Johanson in 1974, is an Australopithecus afarensis dated to ~3.2 million years ago.'
    ),
    q('q_g9_hist_real_28', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'The Neolithic Revolution refers to _______',
        ['The invention of the wheel.', 'The use of bronze.', 'The shift from hunting to farming.', 'The beginning of writing.'],
        2,
        'The Neolithic Revolution was the monumental transition of human societies from mobile hunting and gathering to settled agriculture and animal husbandry.'
    ),
    q('q_g9_hist_real_29', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'The tool inventions like the hoe and wheel belong to the:',
        ['Paleolithic.', 'Mesolithic.', 'Iron Age.', 'Neolithic.'],
        3,
        'Ground stone axes, hoes for tilling soil, pottery, and wheeled carts emerged during the Neolithic revolution.'
    ),
    q('q_g9_hist_real_30', 'exam_132', 'Grade9', 'History', 'Semester1', 'Mid1',
        'According to the agricultural theory, the state developed as a result of:',
        ['Military conquest.', 'Surplus from farming.', 'Increased hunting.', 'Gold mining.'],
        1,
        'Agricultural food surplus enabled population growth, occupational specialization, trade, social stratification, and centralized administrative state structures.'
    ),

    // =========================================================================
    // 7. GRADE 9 CITIZENSHIP (Semester 1 Mid 1 - exam_127)
    // Physical Paper: Blessed G/Michael Catholic Secondary School 1st Semester Citizenship Test One for Grade 9th Oct, 2018 E.C
    // =========================================================================
    // Part I: True / False
    q('q_g9_cit_real_01', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'True or False: Ethics is the same as morality, and the terms can be used interchangeably.',
        ['True', 'False'],
        1,
        'False. While related, morality generally refers to personal or cultural beliefs about right and wrong, whereas ethics is the systematic, philosophical study and principles governing conduct.'
    ),
    q('q_g9_cit_real_02', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'True or False: A person with integrity always aligns their actions with their words.',
        ['True', 'False'],
        0,
        'True. Integrity means honesty, consistency, and having high moral principles where actions faithfully correspond to verbal commitments.'
    ),
    q('q_g9_cit_real_03', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'True or False: Ethics only deals with personal feelings and opinions, not real-life actions.',
        ['True', 'False'],
        1,
        'False. Ethics is profoundly concerned with real-life actions, human relationships, societal rules, and institutional behavior.'
    ),
    q('q_g9_cit_real_04', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'True or False: One of the key values of ethics is disobedience to the law when it feels inconvenient.',
        ['True', 'False'],
        1,
        'False. Respect for the rule of law and civic responsibility are core values of citizenship and ethics.'
    ),
    q('q_g9_cit_real_05', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'True or False: Respect means treating others with dignity, regardless of differences in background.',
        ['True', 'False'],
        0,
        'True. Mutual respect recognizes the universal dignity and human rights of all individuals without discrimination.'
    ),
    q('q_g9_cit_real_06', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'True or False: Concern for others excludes people with disabilities, as they require separate laws.',
        ['True', 'False'],
        1,
        'False. Inclusive citizenship emphasizes compassion, equal opportunities, protection, and concern for persons with disabilities.'
    ),
    q('q_g9_cit_real_07', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'True or False: Promise-keeping is a part of integrity that strengthens trust and relationships.',
        ['True', 'False'],
        0,
        'True. Honoring promises and commitments establishes credibility and creates social trust.'
    ),

    // Part II: Matching
    q('q_g9_cit_real_08', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Match: Which ethical value describes "Being honest, reliable, and morally upright"?',
        ['Obeying the law', 'Integrity', 'Loyalty', 'Excellence'],
        1,
        'Integrity denotes wholeness of moral character, truthfulness, and upholding ethical standards.'
    ),
    q('q_g9_cit_real_09', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Match: Which civic duty involves "Following rules and upholding justice"?',
        ['Obeying the law', 'Loyalty', 'Trustworthiness', 'Excellence'],
        0,
        'Obeying the law means adhering to established legal frameworks and respecting constitutional order.'
    ),
    q('q_g9_cit_real_10', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Match: Which term corresponds to "Being honest and dependable in relationships"?',
        ['Trustworthiness', 'Excellence', 'Loyalty', 'Integrity'],
        0,
        'Trustworthiness is the quality of inspiring confidence through honesty, dependability, and faithfulness.'
    ),
    q('q_g9_cit_real_11', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Match: Which term is defined as "Being faithful to individuals, society, and country"?',
        ['Excellence', 'Loyalty', 'Trustworthiness', 'Obeying the law'],
        1,
        'Loyalty involves unswerving allegiance, duty, and faithfulness to community and country.'
    ),
    q('q_g9_cit_real_12', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Match: Which quality entails "Striving for quality and constant self-improvement"?',
        ['Loyalty', 'Trustworthiness', 'Excellence', 'Integrity'],
        2,
        'Commitment to excellence means striving to achieve the highest possible standard in studies, work, and personal growth.'
    ),

    // Part III: Multiple Choice
    q('q_g9_cit_real_13', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'A society with ethical citizens is characterized by _______',
        ['Corruption and injustice.', 'Division and mistrust.', 'Sustainable peace, unity, and rule of law.', 'Violence and disorder.'],
        2,
        'Ethical citizenship fosters rule of law, mutual harmony, social trust, and lasting peace.'
    ),
    q('q_g9_cit_real_14', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Theoretical ethics is mainly concerned with _______',
        ['How to apply laws.', 'Business rules.', 'Emotional intelligence.', 'The origin and nature of moral judgments.'],
        3,
        'Meta-ethics / theoretical ethics explores fundamental philosophical questions regarding the origins, nature, and meaning of moral values.'
    ),
    q('q_g9_cit_real_15', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Commitment to excellence requires to _______',
        ['Avoiding hard work.', 'Dependence on others.', 'Dedication, perseverance, and self-improvement.', 'Ignoring personal growth.'],
        2,
        'Excellence requires diligent hard work, dedication, resilience, and steady personal development.'
    ),
    q('q_g9_cit_real_16', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'What we learn from Ethics?',
        ['Compete aggressively.', 'Ignore community needs.', 'Focus only on personal benefit.', 'Act in morally sound ways and avoid unethical actions.'],
        3,
        'Ethics guides moral behavior, encouraging good conduct and prevention of harmful or corrupt actions.'
    ),
    q('q_g9_cit_real_17', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'What does it mean respect for humanity?',
        ['Supporting only people of similar background.', 'Focusing only on oneself.', 'Treating all people equally regardless of differences.', 'Avoiding interaction with others.'],
        2,
        'Respect for humanity requires honoring the universal dignity of all persons regardless of ethnicity, religion, or social class.'
    ),
    q('q_g9_cit_real_18', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'The term ethics originates from the Greek word ethos, which means:',
        ['Customs, habits, or character.', 'Religion and belief.', 'Justice and fairness.', 'Law and order.'],
        0,
        'The word ethics derives from the ancient Greek "ethos", meaning custom, disposition, habit, or character.'
    ),
    q('q_g9_cit_real_19', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Being free from addiction is considered an attribute of _______',
        ['Hardworking nature.', 'Intellectual ability.', 'Social responsibility.', 'True integrity.'],
        3,
        'Maintaining physical, mental, and moral self-control and freedom from destructive addictions reflects personal integrity and responsible self-care.'
    ),
    q('q_g9_cit_real_20', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Ethical values serve as:',
        ['Legal restrictions.', 'Social traditions.', 'Guiding principles to distinguish right from wrong.', 'Religious commandments.'],
        2,
        'Ethical values act as moral compasses that guide human choices, distinguishing right from wrong.'
    ),
    q('q_g9_cit_real_21', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Which of the following is not listed as a key ethical value?',
        ['Laziness.', 'Honesty.', 'Integrity.', 'Fairness.'],
        0,
        'Laziness is a vice and negative habit, not an ethical value.'
    ),
    q('q_g9_cit_real_22', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'What is the meaning of Integrity?',
        ['Following all traditions blindly.', 'Staying true to moral principles in both private and public life.', 'Seeking personal success at any cost.', 'Being influenced by others\\' opinions.'],
        1,
        'Integrity is the practice of consistently adhering to ethical and moral principles, whether in public scrutiny or in private.'
    ),
    q('q_g9_cit_real_23', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Ethics mainly deals with:',
        ['Political systems.', 'Economic theories.', 'Religious rituals.', 'Moral principles and values guiding human behavior.'],
        3,
        'Ethics is the branch of philosophy concerning moral guidelines and rules governing human conduct.'
    ),
    q('q_g9_cit_real_24', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'A person with integrity is characterized by:',
        ['Dishonesty and inconsistency.', 'Selfishness and jealousy.', 'Honesty, trustworthiness, and consistency.', 'Laziness and irresponsibility.'],
        2,
        'Honesty, consistency, dependability, and ethical steadfastness are hallmarks of integrity.'
    ),
    q('q_g9_cit_real_25', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Ethical values are essential for citizens. Why? B/c',
        ['Increase personal wealth.', 'Encourage lawlessness.', 'Promote individualism.', 'Build a peaceful, just, and harmonious society.'],
        3,
        'Ethical citizens create the bedrock of justice, security, mutual trust, and national solidarity.'
    ),
    q('q_g9_cit_real_26', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Practical ethics focuses on:',
        ['Writing moral laws.', 'Understanding cultural values.', 'Conducting philosophical research only.', 'Applying moral principles in real-life situations.'],
        3,
        'Applied (practical) ethics examines how moral theory is applied to real-world dilemmas in medicine, business, environment, and social life.'
    ),
    q('q_g9_cit_real_27', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Abiding by the law ensures:',
        ['Fairness, justice, and order.', 'Weak moral values.', 'Social disorder.', 'Ignorance of ethics.'],
        0,
        'Lawfulness guarantees public safety, social order, equality before the law, and civil protection.'
    ),
    q('q_g9_cit_real_28', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Without ethical guidelines, society would _______',
        ['Be more productive.', 'Have fewer conflicts.', 'Be difficult to navigate responsibly.', 'Improve its moral standards naturally.'],
        2,
        'Without moral boundaries, lawlessness, exploitation, and social breakdown make civilized life impossible.'
    ),
    q('q_g9_cit_real_29', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Ethics is important in daily life because it helps us:',
        ['Control others.', 'Earn more wealth.', 'Follow traditions without questioning.', 'Decide what is acceptable and unacceptable behavior.'],
        3,
        'Ethics helps individuals make responsible daily choices between right and wrong.'
    ),
    q('q_g9_cit_real_30', 'exam_127', 'Grade9', 'Citizenship', 'Semester1', 'Mid1',
        'Promise-keeping as an ethical value strengthens:',
        ['Relationships and trust.', 'Competition and rivalry.', 'Individual wealth.', 'Social conflict.'],
        0,
        'Fulfilling commitments creates mutual dependability and bonds of social trust.'
    ),

    // =========================================================================
    // 8. GRADE 9 ECONOMICS (Semester 1 Mid 1 - exam_128)
    // Physical Paper: Blessed G/Michael Catholic Secondary School 1st Semester Economics Test One for Grade 9th
    // =========================================================================
    // Part I: True / False
    q('q_g9_econ_real_01', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'True or False: Microeconomics deals with individual consumers and firms.',
        ['True', 'False'],
        0,
        'True. Microeconomics examines the economic decision-making of individual agents such as single consumers, households, and business firms.'
    ),
    q('q_g9_econ_real_02', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'True or False: Normative economics is value-free and objective.',
        ['True', 'False'],
        1,
        'False. Positive economics is factual and value-free. Normative economics deals with what "ought to be" and is based on subjective value judgments.'
    ),
    q('q_g9_econ_real_03', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'True or False: Households are the buyers of factors of production.',
        ['True', 'False'],
        1,
        'False. In the circular flow of income, households own and sell factors of production (land, labor, capital) while business firms are the buyers.'
    ),
    q('q_g9_econ_real_04', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'True or False: In a command economy, all production is controlled by private firms.',
        ['True', 'False'],
        1,
        'False. In a command (socialist) economy, economic decisions and production are controlled by the central government, not private firms.'
    ),
    q('q_g9_econ_real_05', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'True or False: Capitalism allows private ownership and competition.',
        ['True', 'False'],
        0,
        'True. A capitalist market economy is based on private ownership of property, freedom of enterprise, and competitive markets.'
    ),
    q('q_g9_econ_real_06', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'True or False: Deductive and inductive methods compete with each other.',
        ['True', 'False'],
        1,
        'False. Deductive and inductive methods are complementary approaches in economic analysis, often used together to form and test theories.'
    ),

    // Part II: Multiple Choice
    q('q_g9_econ_real_07', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'The basic economic problem arises because:',
        ['Resources are unlimited', 'Human wants are limited', 'Resources are scarce but wants are unlimited', 'Governments mismanage'],
        2,
        'Scarcity is the fundamental economic problem: society has limited productive resources to satisfy unlimited human needs and desires.'
    ),
    q('q_g9_econ_real_08', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'Opportunity cost refers to:',
        ['The monetary cost of goods', 'The next best alternative foregone', 'Total production cost', 'The accounting profit'],
        1,
        'Opportunity cost is the value of the next best alternative that is given up when a choice is made.'
    ),
    q('q_g9_econ_real_09', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'Which point on a PPF (Production Possibility Frontier) is unattainable?',
        ['Inside the curve', 'On the curve', 'Outside the curve', 'None'],
        2,
        'Points outside the PPF curve represent combinations that cannot be produced with the current resources and technology.'
    ),
    q('q_g9_econ_real_10', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        '"How to produce goods?" is also called:',
        ['Problem of allocation', 'Problem of choice of technique', 'Problem of distribution', 'Problem of consumption'],
        1,
        '"How to produce?" deals with choosing the method or technique of production, such as labor-intensive versus capital-intensive techniques.'
    ),
    q('q_g9_econ_real_11', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'Which is a characteristic of a mixed economy?',
        ['Collective ownership only', 'Private ownership only', 'Co-existence of private and public sectors', 'No government planning'],
        2,
        'A mixed economic system combines elements of private enterprise with public government intervention.'
    ),
    q('q_g9_econ_real_12', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'The deductive method proceeds from:',
        ['Specific to general', 'Facts to hypothesis', 'General to specific', 'Data to theory'],
        2,
        'Deductive reasoning moves from general principles and assumptions to specific logical conclusions.'
    ),
    q('q_g9_econ_real_13', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'Which of the following is a feature of normative economics?',
        ['It deals with facts', 'It includes value judgments', 'It focuses only on data', 'It ignores ethics'],
        1,
        'Normative statements express opinions and value judgments regarding what policies ought to be implemented.'
    ),
    q('q_g9_econ_real_14', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'Among the following, which one is a scarce resource?',
        ['Oxygen in atmosphere', 'Land', 'Sunlight', 'Ambient air'],
        1,
        'Land is an economic resource with a limited supply and positive price, unlike ambient air or sunlight.'
    ),
    q('q_g9_econ_real_15', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'Which of the following is correct?',
        ['Any disagreement on normative economics can be resolved through fact', 'Economic growth can be one concern of microeconomics', 'Inductive reasoning analyze from specific to general', 'All of the above'],
        2,
        'Inductive reasoning begins with specific empirical observations and facts to formulate general principles.'
    ),
    q('q_g9_econ_real_16', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'Which of the following statements would best describe firms?',
        ['They are owners of factor resources', 'They mix factor resources and change it into one final output', 'They impose taxes on households', 'They are buyers of final output'],
        1,
        'Firms combine factors of production (labor, raw materials, capital) to produce finished goods and services.'
    ),

    // Part III: Workout Application
    q('q_g9_econ_real_17', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'Given a country\\'s production combinations: Combination C (20 Machines, 100 Food) and Combination D (30 Machines, 0 Food). What is the total opportunity cost in food when moving from C to D to produce 10 extra machines?',
        ['50 units of food', '100 units of food', '150 units of food', '200 units of food'],
        1,
        'Moving from C (100 food) to D (0 food) requires giving up 100 - 0 = 100 units of food.'
    ),
    q('q_g9_econ_real_18', 'exam_128', 'Grade9', 'Economics', 'Semester1', 'Mid1',
        'When moving from combination C (20 Machines, 100 Food) to D (30 Machines, 0 Food), what is the per-unit opportunity cost of producing each additional machine?',
        ['0.1 units of food', '5 units of food', '10 units of food', '20 units of food'],
        2,
        'Per-unit opportunity cost = Sacrificed Food / Gained Machines = (100 - 0) / (30 - 20) = 100 / 10 = 10 units of food per machine.'
    ),

    // =========================================================================
    // 9. GRADE 9 INFORMATION TECHNOLOGY (Semester 1 Mid 1 - exam_133)
    // Physical Paper: Blessed G/Michael Catholic Secondary School 1st Semester IT Test One for Grade 9th Oct, 2018 E.C
    // =========================================================================
    // Part I: True / False
    q('q_g9_it_real_01', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'True or False: Save allows you to update a previously saved file with new content.',
        ['True', 'False'],
        0,
        'True. The Save command writes updates and modifications directly to the existing file path without prompting for a new filename.'
    ),
    q('q_g9_it_real_02', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'True or False: Renaming a file does not remove its content.',
        ['True', 'False'],
        0,
        'True. Renaming simply modifies the file identifier in the directory index while the data bytes remain intact.'
    ),
    q('q_g9_it_real_03', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'True or False: Windows does not allow handling multiple files.',
        ['True', 'False'],
        1,
        'False. Operating systems like Windows support multi-file selection (using Ctrl/Shift), batch renaming, moving, and deleting.'
    ),
    q('q_g9_it_real_04', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'True or False: A folder is also called a directory.',
        ['True', 'False'],
        0,
        'True. Directory is the file system term, while folder is the graphical user interface term; both represent storage containers.'
    ),
    q('q_g9_it_real_05', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'True or False: A storage drive can be fixed and removable.',
        ['True', 'False'],
        0,
        'True. Internal hard disk/SSD drives are fixed, while USB flash drives and external hard drives are removable.'
    ),
    q('q_g9_it_real_06', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'True or False: Each file in a computer has unique icons.',
        ['True', 'False'],
        1,
        'False. Files sharing the same file extension (.docx, .pdf, .txt) share the same default application icon.'
    ),
    q('q_g9_it_real_07', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'True or False: Software cannot be shared over the network.',
        ['True', 'False'],
        1,
        'False. Software, web applications, and network licenses are routinely shared and accessed across local networks and the internet.'
    ),
    q('q_g9_it_real_08', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'True or False: MAN covers the area of a city and can contain multiple WANs.',
        ['True', 'False'],
        1,
        'False. A Wide Area Network (WAN) spans countries and continents; a Metropolitan Area Network (MAN) covers a city and cannot contain WANs.'
    ),

    // Part II: Multiple Choice
    q('q_g9_it_real_09', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Which type of icon can take you to another place or open a file quickly?',
        ['File', 'Folder', 'Application', 'None of the above (Shortcut)'],
        3,
        'A shortcut icon (indicated by a small arrow) links directly to a file, folder, or application elsewhere on the drive.'
    ),
    q('q_g9_it_real_10', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        '_______ displays information about a selected folder and its contents.',
        ['Ribbon', 'Address bar', 'Status Bar', 'None'],
        2,
        'The Status Bar at the bottom of the window displays item count, selected count, and size information.'
    ),
    q('q_g9_it_real_11', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        '_______ is used to enable you to perform layout, formatting and sharing tasks.',
        ['Ribbon', 'Status Bar', 'Address bar', 'None'],
        0,
        'The Ribbon toolbar organizes tools into tabs (Home, Insert, Layout) for editing, formatting, and operations.'
    ),
    q('q_g9_it_real_12', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        '_______ means locating a file among a set of files.',
        ['Deleting', 'Searching', 'Opening', 'Creating'],
        1,
        'Searching allows the user to find files by typing their name, extension, or keywords in the search bar.'
    ),
    q('q_g9_it_real_13', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Which one of the following is not used to move files?',
        ['Cut and paste', 'Move to Folder command', 'Drag-and-drop', 'None (All are valid methods)'],
        3,
        'Cut and paste, Drag-and-drop, and the "Move to" menu command are all standard techniques to move files.'
    ),
    q('q_g9_it_real_14', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'In a computer, a file can be _______',
        ['Document', 'Application', 'Video', 'All of the above'],
        3,
        'Computer files store documents, executable programs, video, audio, images, and other digital data.'
    ),
    q('q_g9_it_real_15', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Which one of the following devices is used to select the appropriate path within a network?',
        ['Repeater', 'Switch', 'Router', 'All'],
        2,
        'A Router inspects destination IP addresses and determines the optimal routing path between different network segments.'
    ),
    q('q_g9_it_real_16', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'The network system that spans states, countries or the whole world is _______',
        ['MAN', 'LAN', 'PAN', 'None (WAN)'],
        3,
        'A Wide Area Network (WAN) connects computers over large geographical areas such as countries and continents.'
    ),
    q('q_g9_it_real_17', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'A network system within a single building or school campus is _______',
        ['LAN', 'MAN', 'WAN', 'None'],
        0,
        'A Local Area Network (LAN) covers a small geographic area such as an office, home, or school campus.'
    ),
    q('q_g9_it_real_18', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Which device accepts a weak signal, then boosts it to its original strength and forwards it to the next network segment?',
        ['Switch', 'NIC', 'Router', 'None of the above (Repeater)'],
        3,
        'A Repeater amplifies and regenerates attenuated signals to extend network transmission distances.'
    ),
    q('q_g9_it_real_19', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Which one of the following is an optical disk drive?',
        ['CD drives', 'DVD drive', 'A and B', 'USB drives'],
        2,
        'Both CD and DVD drives use laser optics to read and write data on circular discs.'
    ),
    q('q_g9_it_real_20', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        '_______ is a hardware storage unit of a computer which stores files and folders.',
        ['NIC', 'Drive', 'Driver', 'None'],
        1,
        'A storage Drive (such as C: drive, SSD, HDD) holds files, folders, and operating system data.'
    ),
    q('q_g9_it_real_21', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Which one of the following is not an image editing software?',
        ['Microsoft Paint and Paint 3D', 'GIMP', 'Adobe Photoshop', 'None (All are image editors)'],
        3,
        'Paint, GIMP, and Photoshop are all widely recognized bitmap/raster image editing programs.'
    ),
    q('q_g9_it_real_22', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Which one of the following is found under Quick Access in File Explorer?',
        ['Desktop', 'Documents', 'Pictures', 'All of the above'],
        3,
        'Quick Access pins frequently accessed folders including Desktop, Documents, Downloads, and Pictures.'
    ),
    q('q_g9_it_real_23', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'A short-range wireless network created by Bluetooth is known as _______',
        ['WAN', 'MAN', 'PAN', 'None'],
        2,
        'A Personal Area Network (PAN) covers personal devices within a short radius (~10 meters), commonly using Bluetooth.'
    ),
    q('q_g9_it_real_24', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Suppose a bank wants to connect three of its branches in a given city, which type of network solves the problem?',
        ['WAN', 'MAN', 'PAN', 'LAN'],
        1,
        'A Metropolitan Area Network (MAN) is designed to connect facilities and branch offices across an entire city.'
    ),

    // Part III: Matching
    q('q_g9_it_real_25', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Match: Which component is described as "Used to manage files and folders"?',
        ['Computer', 'File Explorer', 'Navigation pane', 'Protocols'],
        1,
        'File Explorer (formerly Windows Explorer) provides the graphical user interface for managing files and folders.'
    ),
    q('q_g9_it_real_26', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Match: In a network architecture, a workstation or personal computer acts as an:',
        ['End Device', 'Intermediary Device', 'Protocol', 'Transmission medium'],
        0,
        'End devices (hosts, PCs, smartphones) form the source and destination of data messages across a network.'
    ),
    q('q_g9_it_real_27', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Match: What interface area lets you "View your computer\\'s file and folder structure"?',
        ['Ribbon', 'Status Bar', 'Navigation pane', 'Title bar'],
        2,
        'The Navigation pane on the left side of File Explorer shows the hierarchical folder tree and drives.'
    ),
    q('q_g9_it_real_28', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Match: A Network Interface Card (NIC) is classified as an:',
        ['End Device', 'Intermediary Device', 'File system', 'Application software'],
        1,
        'The NIC provides physical connectivity and network interface intermediation.'
    ),
    q('q_g9_it_real_29', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Match: What is defined as a "Collection of data or information stored under a name"?',
        ['Folder', 'File', 'Drive', 'Protocol'],
        1,
        'A file is a named collection of related data stored on computer storage.'
    ),
    q('q_g9_it_real_30', 'exam_133', 'Grade9', 'IT', 'Semester1', 'Mid1',
        'Match: What represents a "Set of rules to guide communications across a network"?',
        ['Protocols', 'Topology', 'Navigation', 'Operating System'],
        0,
        'Protocols (such as TCP/IP, HTTP) define standard rules and formats for exchanging data over networks.'
    ),

    // =========================================================================
    // 10. GRADE 9 GEOGRAPHY (Semester 1 Mid 1 - exam_130)
    // Physical Paper: Blessed G/Michael Catholic Secondary School 1st Semester Geography mid one test for Grade 9th Nov, 2018 E.C
    // =========================================================================
    // Part I: Matching
    q('q_g9_geog_real_01', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Match: Which prominent mountain peak belongs to The Plateau of Tigray?',
        ['Mount Ras Dashen', 'Mount Ambalage', 'Mount Abbuye Meda', 'Gamo-Konso Highlands'],
        1,
        'Mount Ambalage is located in the northern plateau of Tigray.'
    ),
    q('q_g9_geog_real_02', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Match: Which highest Ethiopian mountain is situated in The North Central Massif?',
        ['Mount Ras Dashen', 'Mount Batu', 'Mount Ambalage', 'Mount Guna'],
        0,
        'Mount Ras Dashen (4,550m in the Simien Mountains) belongs to the North Central Massifs.'
    ),
    q('q_g9_geog_real_03', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Match: Which peak is located on The Plateau of Shewa?',
        ['Mount Abbuye Meda', 'Mount Ras Dashen', 'Mount Ambalage', 'Gamo-Konso'],
        0,
        'Mount Abbuye Meda (4,012m) is situated in the Shewan plateau.'
    ),
    q('q_g9_geog_real_04', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Match: Which highlands are located in The Southwestern Highlands of Ethiopia?',
        ['Gamo-Konso Highlands', 'Simien Massif', 'Tigray Plateau', 'Hararghe Massif'],
        0,
        'The Gamo-Konso highlands form part of the rugged southwestern Ethiopian highlands.'
    ),
    q('q_g9_geog_real_05', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Match: The Mesozoic geological era is characterized biologically by:',
        ['Predominance of invertebrates', 'Predominance of reptiles and dinosaurs', 'Evolution of humans', 'Origin of simple bacteria'],
        1,
        'The Mesozoic era (Age of Reptiles) was dominated by reptiles and dinosaurs.'
    ),
    q('q_g9_geog_real_06', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Match: The Paleozoic geological era is characterized biologically by:',
        ['Predominance of invertebrates', 'Predominance of reptiles', 'Domination of mammals', 'Rise of modern birds'],
        0,
        'The Paleozoic era witnessed the explosion and predominance of marine invertebrates, fish, and early amphibians.'
    ),

    // Part II: Multiple Choice
    q('q_g9_geog_real_07', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Which of the following elements of geographical study is related to Demography?',
        ['Geomorphology', 'Climatology', 'Population', 'Biogeography'],
        2,
        'Demography is the scientific statistical study of human populations, including births, deaths, growth, and migration.'
    ),
    q('q_g9_geog_real_08', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Which sub-division of the lowlands of Ethiopia is found in the northwestern part of the country?',
        ['The Omo-Ghibe Lowlands', 'The Erkele-Ogaden Lowlands', 'The Borena Lowlands', 'The Tekeze-Angereb Lowlands'],
        3,
        'The Tekeze and Angereb lowlands border northwestern Ethiopia and Sudan.'
    ),
    q('q_g9_geog_real_09', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Which physiographic division of Ethiopia is highly affected by volcanic eruptions and earthquakes?',
        ['Highlands', 'Lowlands', 'Rift Valley', 'Plateau'],
        2,
        'The Ethiopian Rift Valley is a tectonically active fault zone marked by geothermal activity, active volcanoes, and seismic tremors.'
    ),
    q('q_g9_geog_real_10', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        '_______ and _______ are the highest and lowest places in Ethiopia respectively.',
        ['Batu and Tendaho', 'Ras Dashen and Dallol', 'Ras Dashen and Qatta', 'Batu and Ogaden'],
        1,
        'Ras Dashen is Ethiopia\\'s highest point (4,550 m above sea level), and the Dallol depression in Afar is the lowest (-125 m below sea level).'
    ),
    q('q_g9_geog_real_11', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Which one of the following combinations of mountains and highlands of Ethiopia is NOT CORRECT?',
        ['Gara muleta -> The Plateau of Tigray', 'Assimba -> The Bale Massif', 'Abbuye Meda -> The Plateau of Shewa', 'Kolo -> The North Central Massif'],
        0,
        'Gara Muleta is located in the Hararghe (Eastern) Highlands, not the Tigray Plateau.'
    ),
    q('q_g9_geog_real_12', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Which plateau serves as a watershed between the Awash and Abay river basins?',
        ['Mt of Tigray', 'Mt of Southwestern', 'Mt of Shewa', 'Mt of Central massifs'],
        2,
        'The Shewan plateau forms the drainage divide separating the westward-flowing Abay (Blue Nile) from the rift-ward Awash basin.'
    ),
    q('q_g9_geog_real_13', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'The Great East African Rift Valley extends from _______ to _______',
        ['China to Mozambique', 'Syria to Chewbahir', 'Turkey to Tanzania', 'Syria to Mozambique'],
        3,
        'The system extends approximately 6,000 kilometers from the Jordan Valley and Syria in the north down to Mozambique in southeastern Africa.'
    ),
    q('q_g9_geog_real_14', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Geologically, which area is the most unstable part of Ethiopia?',
        ['The north western highland', 'The rift valley', 'The north central massifs', 'The Abay gorge'],
        1,
        'The Rift Valley floor sits directly above crustal spreading centres, making it the most tectonically unstable region in Ethiopia.'
    ),
    q('q_g9_geog_real_15', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Which part of the Geosphere is termed as the rock (solid) layer of the earth?',
        ['Biosphere', 'Atmosphere', 'Lithosphere', 'Hydrosphere'],
        2,
        'The lithosphere is the solid, rocky outer layer of the Earth consisting of the crust and uppermost mantle.'
    ),
    q('q_g9_geog_real_16', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Dinosaurs disappeared from the earth during the:',
        ['Early of Mesozoic', 'End of Mesozoic', 'Early of Cenozoic', 'End of Paleozoic'],
        1,
        'Dinosaurs went extinct at the Cretaceous-Paleogene extinction boundary at the end of the Mesozoic era (~66 million years ago).'
    ),
    q('q_g9_geog_real_17', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Series trapping lava and extensive volcanic eruptions were common in Ethiopia during the:',
        ['Mesozoic era', 'Precambrian era', 'Cenozoic era', 'Paleozoic era'],
        0,
        'During the Cenozoic era, massive flood basalt volcanism poured out the Trappean series forming the highland plateaus.'
    ),
    q('q_g9_geog_real_18', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Which of the following is not an endogenic (internal) force?',
        ['Volcanism', 'Faulting', 'Erosion', 'Folding'],
        2,
        'Erosion is an exogenic (external weathering/denudation) process driven by water, wind, and gravity.'
    ),
    q('q_g9_geog_real_19', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Upper sandstone of Ethiopia was deposited during the _______ period.',
        ['Triassic', 'Cretaceous', 'Jurassic', 'Quaternary'],
        1,
        'During the Cretaceous marine regression, the Upper Sandstone formation was deposited.'
    ),
    q('q_g9_geog_real_20', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'The extreme point that lies at the westernmost tip of Ethiopia is:',
        ['Ogaden', 'Akobo', 'Moyale', 'Badime'],
        1,
        'Akobo in the Gambella region is Ethiopia\\'s westernmost geographical extreme point.'
    ),
    q('q_g9_geog_real_21', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Which neighboring country shares the longest boundary line with Ethiopia?',
        ['Eritrea', 'Djibouti', 'Somalia', 'Sudan'],
        2,
        'Somalia shares the longest international land border with Ethiopia (~1,600 km).'
    ),
    q('q_g9_geog_real_22', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'The most overlying Mesozoic rock layer in Ethiopia is:',
        ['Hintalo limestone', 'Upper sandstone', 'Adigrat sandstone', 'Basement complex'],
        1,
        'In the Mesozoic stratigraphic column of Ethiopia, Upper Sandstone sits at the top, deposited as the Mesozoic sea retreated.'
    ),
    q('q_g9_geog_real_23', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Among the following fields of physical geography, which one studies the forces that change land forms?',
        ['Geomorphology', 'Soil geography', 'Climatology', 'Ocean geography'],
        0,
        'Geomorphology is the study of the physical features of the Earth\\'s surface and their relation to its geological structures and forces.'
    ),
    q('q_g9_geog_real_24', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'The present land forms of Ethiopia mainly resulted from the geologic events of:',
        ['The Paleozoic era', 'The Precambrian era', 'Tertiary and quaternary periods', 'The Jurassic and Triassic periods'],
        2,
        'Tertiary uplift, faulting, rifting, and Quaternary deposition created modern Ethiopian relief and topography.'
    ),
    q('q_g9_geog_real_25', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Which areas of the following highlands of Ethiopia are the wettest?',
        ['The Bale massifs', 'The Shewan plateaus', 'The south western highlands', 'The North central massifs'],
        2,
        'The Southwestern highlands (around Kaffa and Illubabor) receive the highest annual rainfall in Ethiopia (over 2,200 mm).'
    ),
    q('q_g9_geog_real_26', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'What makes Ethiopia "the roof of North-Eastern" Africa?',
        ['Its compact shape', 'Its large proportion of highlands', 'Its large proportion of Arable land', 'Its large proportion of rivers'],
        1,
        'Over 50% of all African land above 2,000 meters elevation is found in Ethiopia, earning it the title "the roof of Northeast Africa".'
    ),
    q('q_g9_geog_real_27', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'As Adigrat sandstone is to Triassic period, then Hintalo limestone is to:',
        ['Quaternary period', 'Cretaceous period', 'Tertiary period', 'Jurassic period'],
        3,
        'Adigrat sandstone was deposited during the Triassic transgression, followed by Hintalo limestone during maximum Jurassic inundation.'
    ),
    q('q_g9_geog_real_28', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Which geological era is known as an era of amphibians?',
        ['Cenozoic', 'Mesozoic', 'Paleozoic', 'Precambrian'],
        2,
        'The late Paleozoic era (Carboniferous period) is renowned as the Age of Amphibians.'
    ),
    q('q_g9_geog_real_29', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'One can associate the Cenozoic era in Ethiopia with the formation of extensive:',
        ['Metamorphic rock', 'Sedimentary rock', 'Changed rock', 'Igneous rock'],
        3,
        'Massive Cenozoic volcanic trap series produced vast basaltic and rhyolitic igneous formations.'
    ),
    q('q_g9_geog_real_30', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'The plateau of Tigray is separated from the plateaus of Eritrea by the:',
        ['Abbay River', 'Mereb River', 'Genale River', 'Tekeze River'],
        1,
        'The Mereb (Gash) River forms the natural boundary separating the Tigray Plateau from the Eritrean highlands.'
    ),
    q('q_g9_geog_real_31', 'exam_130', 'Grade9', 'Geography', 'Semester1', 'Mid1',
        'Which of the following statements is correct about the Great East African Rift Valley?',
        ['It extends from Syria to Mozambique.', 'It is formed as a result of folding.', 'It is the second largest in the world.', 'All Ethiopia lakes are found in the rift-Valley.'],
        0,
        'The Great Rift Valley system extends across ~6,000 km from Syria to Mozambique.'
    ),

    // =========================================================================
    // 11. GRADE 9 HEALTH & PHYSICAL EDUCATION (Semester 1 Mid 1 - exam_131)
    // Physical Paper: Blessed G/Michael Catholic Secondary School First Semester H.P.E First test for Grade 9th Nov, 2018 E.C
    // =========================================================================
    // Part I: True / False
    q('q_g9_hp_real_01', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'True or False: Nutrition is a chemical substance in our food.',
        ['True', 'False'],
        0,
        'True. Nutrients are chemical compounds in food that provide energy, structural materials, and regulating agents.'
    ),
    q('q_g9_hp_real_02', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'True or False: Health is an optimal state of health and wellbeing.',
        ['True', 'False'],
        1,
        'False. Health is defined by WHO as a state of complete physical, mental, and social well-being, not merely an optimal state or absence of disease.'
    ),
    q('q_g9_hp_real_03', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'True or False: Physical exercise is any body movement produced by skeletal muscles that result in energy expenditure.',
        ['True', 'False'],
        1,
        'False. Any bodily movement resulting in energy expenditure is physical activity; physical exercise is a subcategory that is planned, structured, and repetitive.'
    ),
    q('q_g9_hp_real_04', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'True or False: Reaction time is the ability to develop the gap between message receiving and responding or taking action.',
        ['True', 'False'],
        0,
        'True. Reaction time measures the time elapsed between receiving a sensory stimulus and executing a muscular response.'
    ),
    q('q_g9_hp_real_05', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'True or False: Our level of physical fitness performance is not constant.',
        ['True', 'False'],
        0,
        'True. Physical fitness fluctuates with training intensity, rest, nutrition, aging, and detraining.'
    ),
    q('q_g9_hp_real_06', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'True or False: Muscle type is a factor that affects physical fitness performance.',
        ['True', 'False'],
        0,
        'True. The ratio of slow-twitch (Type I endurance) to fast-twitch (Type II power/speed) muscle fibers directly influences athletic performance.'
    ),

    // Part II: Multiple Choice
    q('q_g9_hp_real_07', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'Who benefits from organizing a sporting event in one kebele, woreda, city or nation?',
        ['Hotel owners', 'Transport owner', 'Marketers', 'All of the above'],
        3,
        'Sport events stimulate the local economy, benefiting hospitality, public transport, retail marketers, and communities.'
    ),
    q('q_g9_hp_real_08', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'Who is benefited from gender equality in sports and society?',
        ['Female', 'Males', 'Nation', 'All of the above'],
        3,
        'Gender equality empowers women, improves family welfare, increases economic productivity, and strengthens the entire nation.'
    ),
    q('q_g9_hp_real_09', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'Which one of the following is not the result of technology in sport?',
        ['Video Assistant Referee (VAR)', 'Sport wear fabrics', 'Facilities and training equipment', 'Fans'],
        3,
        'Fans are spectators and supporters; VAR, specialized sportswear, and fitness facilities are technological innovations.'
    ),
    q('q_g9_hp_real_10', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'Why do some athletes take prohibited performance-enhancing drugs?',
        ['For performance enhancement', 'For recreational use', 'For treating unverified medical conditions', 'All of the above'],
        3,
        'Doping violations arise from illicit attempts to enhance performance, recreational drug use, or misuse of prescription medications.'
    ),
    q('q_g9_hp_real_11', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'What is not an accurate mechanism to determine our true level of physical fitness?',
        ['By looking at external posture alone', 'By resting heart rate', 'By calculating body mass index', 'All of the above'],
        0,
        'External appearance or posture alone does not accurately measure cardiovascular endurance, VO2 max, or internal aerobic capacity.'
    ),
    q('q_g9_hp_real_12', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'Which physical fitness component tends to naturally decline directly with increasing age if not specifically trained?',
        ['Flexibility', 'Strength', 'Power', 'Endurance'],
        0,
        'Joint flexibility and muscle elasticity progressively decline with age without regular stretching routines.'
    ),
    q('q_g9_hp_real_13', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'According to the caloric density per gram, which list is arranged in ascending order?',
        ['Fat - protein - carbohydrate', 'Carbohydrate - fat - protein', 'Carbohydrate (4 kcal) - protein (4 kcal) - fat (9 kcal)', 'Fat - carbohydrate - protein'],
        2,
        'Carbohydrates and proteins yield 4 kcal/gram, while dietary fats yield 9 kcal/gram.'
    ),
    q('q_g9_hp_real_14', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'Which one of the following is true about physical fitness?',
        ['When the level of physical fitness is improved, the resting heart rate decreases.', 'Our level of physical fitness does not vary from one person to another.', 'When you are fit, your energy intake is decreased.', 'When you are detraining, your performance remains constant.'],
        0,
        'A lower resting heart rate (bradycardia of the trained athlete) indicates superior cardiovascular efficiency and increased stroke volume.'
    ),
    q('q_g9_hp_real_15', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'Body Mass Index (BMI) is calculated as the ratio of a person\\'s weight (in kg) to his or her:',
        ['Age', 'Height squared (in m²)', 'Body fat percentage', 'Lean tissue mass'],
        1,
        'BMI formula is weight in kilograms divided by the square of height in meters (kg/m²).'
    ),
    q('q_g9_hp_real_16', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'Which statement best describes comprehensive physical fitness?',
        ['The ability to involve in one specific type of sport event', 'The ability to develop a single motor skill', 'The ability to perform without effectively and efficiently through our daily life span', 'None of the above'],
        3,
        'Physical fitness is the ability to carry out daily tasks with vigor and alertness, without undue fatigue, and with ample energy to enjoy leisure and meet unforeseen emergencies.'
    ),
    q('q_g9_hp_real_17', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'All of the following are skill-related components of physical fitness EXCEPT:',
        ['Agility', 'Speed', 'Power', 'Flexibility'],
        3,
        'Flexibility is a health-related fitness component (along with cardiovascular endurance, muscular strength, muscular endurance, and body composition).'
    ),
    q('q_g9_hp_real_18', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'In 1 g of fat and 1 g of protein, how many total calories (kcal) are found together?',
        ['9 kcal', '4 kcal', '10 kcal', '13 kcal'],
        3,
        '1 gram of fat = 9 kcal, and 1 gram of protein = 4 kcal; together they contain 9 + 4 = 13 kcal.'
    ),

    // Part III: Health & Nutrition Application
    q('q_g9_hp_real_19', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'Which pair represents health-related physical fitness components?',
        ['Agility and Reaction Time', 'Speed and Coordination', 'Flexibility and Cardiovascular Endurance', 'Balance and Power'],
        2,
        'Flexibility, cardiovascular endurance, muscular strength, and body composition are health-related physical fitness components.'
    ),
    q('q_g9_hp_real_20', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'What are the three primary energy-yielding macronutrients in human food?',
        ['Vitamins, Minerals, and Water', 'Carbohydrates, Proteins, and Fats', 'Calcium, Iron, and Sodium', 'Fiber, Amino Acids, and Enzymes'],
        1,
        'Carbohydrates, proteins, and lipids (fats) are the primary dietary energy sources.'
    ),
    q('q_g9_hp_real_21', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'If a student has a weight of 100 kg and a height of 2 meters, what is their BMI?',
        ['20 kg/m²', '25 kg/m²', '30 kg/m²', '50 kg/m²'],
        1,
        'BMI = Weight / (Height)² = 100 / (2 × 2) = 100 / 4 = 25 kg/m².'
    ),
    q('q_g9_hp_real_22', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'If a balanced dietary plan consists of 1,000 g of food daily and allocates 30% to healthy fats, how many grams of fat should be consumed?',
        ['150 g', '200 g', '300 g', '400 g'],
        2,
        '30% of 1,000 g = (30 / 100) × 1,000 = 300 g.'
    ),
    q('q_g9_hp_real_23', 'exam_131', 'Grade9', 'HP', 'Semester1', 'Mid1',
        'If the same 1,000 g dietary plan allocates 57% to carbohydrates, how many grams of carbohydrates should be consumed?',
        ['450 g', '500 g', '570 g', '600 g'],
        2,
        '57% of 1,000 g = (57 / 100) × 1,000 = 570 g.'
    )
`;

// Read current inject_authentic_exams.js
const currentScript = fs.readFileSync(path.join(__dirname, 'inject_authentic_exams.js'), 'utf8');

// Find insertion point before 'const replacedExamIds'
const insertIdx = currentScript.indexOf('const replacedExamIds =');
if (insertIdx === -1) {
    throw new Error('Could not find replacedExamIds in inject_authentic_exams.js');
}

// Extract base up to the closing of authenticQuestions.push( ... );
const pushCloseIdx = currentScript.lastIndexOf(');', insertIdx);
const baseQuestionsCode = currentScript.substring(0, pushCloseIdx);

const updatedFullScript = baseQuestionsCode + ',' + newQuestionsCode + '\n);\n\n' + `
// PURGE ALL SYNTHETIC QUESTIONS!
// Only 100% genuine questions from physical Blessed G/Michael Catholic Secondary School papers are kept!
console.log('Total authentic questions prepared:', authenticQuestions.length);

db.questions = authenticQuestions;
fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');

console.log('Successfully saved to db.json! Zero synthetic questions remain.');
`;

fs.writeFileSync(path.join(__dirname, 'inject_authentic_exams.js'), updatedFullScript, 'utf8');
console.log('Updated scripts/inject_authentic_exams.js successfully!');
