const FACTS_DB = [
    {
        "fact_number": 1,
        "fact": "The two-element theory of Customary International Law comes from Article 38 of the ICJ Statute, which refers to 'international custom as evidence of a general practice accepted as law.'",
        "linked_question_number": 1
    },
    {
        "fact_number": 2,
        "fact": "The Material/Objective Element of CIL is called State Practice, and it refers to consistent and widespread conduct of states.",
        "linked_question_number": 2
    },
    {
        "fact_number": 3,
        "fact": "The Subjective/Psychological Element of CIL is called Opinio Juris, which is the belief that the practice is legally obligatory, not just habitual.",
        "linked_question_number": 3
    },
    {
        "fact_number": 4,
        "fact": "The Latin phrase opinio juris sive necessitatis was first formulated by French jurist François Gény.",
        "linked_question_number": 4
    },
    {
        "fact_number": 5,
        "fact": "Custom is called 'general international law' because, unlike treaties, it binds all states, not just those that consented to it.",
        "linked_question_number": 5
    },
    {
        "fact_number": 6,
        "fact": "Germany had NOT ratified the 1958 Geneva Convention on the Continental Shelf, so it argued it was not bound by Article 6's equidistance rule.",
        "linked_question_number": 6
    },
    {
        "fact_number": 7,
        "fact": "The ICJ in the North Sea Continental Shelf Cases said that for a treaty rule to become custom, states must follow it with Opinio Juris, and frequency of acts alone is not enough.",
        "linked_question_number": 7
    },
    {
        "fact_number": 8,
        "fact": "The ICJ required delimitation by Equitable principles in the North Sea Continental Shelf Cases, taking account of all relevant circumstances, not by rigid equidistance.",
        "linked_question_number": 8
    },
    {
        "fact_number": 9,
        "fact": "Two Cuban fishing vessels, Paquete Habana and Lola, were seized by the U.S. Navy during the Spanish-American War of 1898.",
        "linked_question_number": 9
    },
    {
        "fact_number": 10,
        "fact": "The Paquete Habana case confirmed that CIL applies in Domestic courts, making the seizure of the fishing vessels illegal.",
        "linked_question_number": 10
    },
    {
        "fact_number": 11,
        "fact": "Article 38 of the ICJ Statute was copied almost verbatim from the Statute of the The Permanent Court of International Justice of 1920, drafted by Edward Descamps.",
        "linked_question_number": 11
    },
    {
        "fact_number": 12,
        "fact": "Clause (2) of Article 38 allows the ICJ to decide a case based on fairness, known as ex aequo et bono, if both parties agree.",
        "linked_question_number": 12
    },
    {
        "fact_number": 13,
        "fact": "General principles of law under Article 38(1)(c) include concepts like pacta sunt servanda, good faith, res judicata, and estoppel.",
        "linked_question_number": 13
    },
    {
        "fact_number": 14,
        "fact": "Formal sources define the process through which rules become legally binding in international law.",
        "linked_question_number": 14
    },
    {
        "fact_number": 15,
        "fact": "Hans Kelsen famously said: 'International law can be defined solely by the ways in which its norms are created.'",
        "linked_question_number": 15
    },
    {
        "fact_number": 16,
        "fact": "Article 53 of the Vienna Convention declares any treaty that conflicts with a jus cogens norm to be void.",
        "linked_question_number": 16
    },
    {
        "fact_number": 17,
        "fact": "Recognized examples of jus cogens include the prohibitions on genocide, slavery, torture, and the unlawful use of force.",
        "linked_question_number": 17
    },
    {
        "fact_number": 18,
        "fact": "A state can avoid being bound by a new emerging customary rule if it consistently and persistently objects that rule from the outset.",
        "linked_question_number": 18
    },
    {
        "fact_number": 19,
        "fact": "The UK's acquiescence to Norway's straight baseline system in the Norwegian Fisheries Case meant the UK forfeited its right to object to the baselines.",
        "linked_question_number": 19
    },
    {
        "fact_number": 20,
        "fact": "The ICJ in Nicaragua v. USA used UNGA Resolution 2625 on Friendly Relations as evidence of existing customary law.",
        "linked_question_number": 20
    },
    {
        "fact_number": 21,
        "fact": "Treaties operate on the principle of pacta tertiis nec nocent nec prosunt, meaning a treaty cannot bind a third state without its consent.",
        "linked_question_number": 21
    },
    {
        "fact_number": 22,
        "fact": "Soft law instruments like UNGA Resolutions are not formally binding but can influence state practice and harden into binding customary international law over time.",
        "linked_question_number": 22
    },
    {
        "fact_number": 23,
        "fact": "A 'subject' of international law is an entity that possesses international legal personality, meaning it has rights and duties under international law.",
        "linked_question_number": 23
    },
    {
        "fact_number": 24,
        "fact": "The ICJ's Reparations for Injuries Advisory Opinion (1949) confirmed that international organisations can also be subjects of international law, not just states.",
        "linked_question_number": 24
    },
    {
        "fact_number": 25,
        "fact": "The four Montevideo criteria for statehood are: a permanent population, a defined territory, an effective government, and the capacity to enter relations with other states.",
        "linked_question_number": 25
    },
    {
        "fact_number": 26,
        "fact": "Jeremy Bentham coined the term 'international law' in 1789 in his Introduction to the Principles of Morals and Legislation, replacing the older expression 'law of nations' (jus gentium).",
        "linked_question_number": 26
    },
    {
        "fact_number": 27,
        "fact": "John Austin in The Province of Jurisprudence Determined (1832) argued that international law was not true 'law' but mere 'positive morality' because it lacked a sovereign and sanctions.",
        "linked_question_number": 27
    },
    {
        "fact_number": 28,
        "fact": "The Peace of Westphalia (1648) established the core principles of state sovereignty, territorial integrity, and non-interference in internal affairs.",
        "linked_question_number": 28
    },
    {
        "fact_number": 29,
        "fact": "The Treaty of Versailles (1919) created the League of Nations, the first attempt at institutionalised collective security.",
        "linked_question_number": 29
    },
    {
        "fact_number": 30,
        "fact": "Scholar Louis Henkin observed that 'almost all nations observe almost all principles of international law almost all of the time.'",
        "linked_question_number": 30
    },
    {
        "fact_number": 31,
        "fact": "In international relations, a state cannot invoke its domestic law as a justification for failure to perform its international obligations (Article 27 VCLT).",
        "linked_question_number": 31
    },
    {
        "fact_number": 32,
        "fact": "The dualist theory maintains that international law and municipal law are two distinct and separate legal systems.",
        "linked_question_number": 32
    },
    {
        "fact_number": 33,
        "fact": "The monist theory, associated with Hans Kelsen, views international law and municipal law as parts of a single unified legal system.",
        "linked_question_number": 33
    },
    {
        "fact_number": 34,
        "fact": "In India, customary international law is generally considered part of domestic law unless it is inconsistent with statutory provisions.",
        "linked_question_number": 34
    },
    {
        "fact_number": 35,
        "fact": "Under Article 253 of the Constitution of India, Parliament has the authority to enact laws for implementing international treaties.",
        "linked_question_number": 35
    },
    {
        "fact_number": 36,
        "fact": "Territorial sovereignty refers to the exclusive authority exercised by a state over its territory, including land, airspace, and territorial waters.",
        "linked_question_number": 36
    },
    {
        "fact_number": 37,
        "fact": "Territorial sovereignty may be acquired through occupation (terra nullius), accretion, cession, conquest, and prescription.",
        "linked_question_number": 37
    },
    {
        "fact_number": 38,
        "fact": "In contemporary international law, loss of territory through conquest is not recognized due to the principle prohibiting the use of force.",
        "linked_question_number": 38
    },
    {
        "fact_number": 39,
        "fact": "The Island of Palmas Case emphasized the importance of continuous and peaceful display of state authority for territorial sovereignty.",
        "linked_question_number": 39
    },
    {
        "fact_number": 40,
        "fact": "State succession occurs when sovereignty over a territory changes, affecting treaties, membership in organizations, and property ownership.",
        "linked_question_number": 40
    },
    {
        "fact_number": 41,
        "fact": "Jurisdiction is divided into prescriptive (making laws), adjudicative (deciding disputes), and enforcement (executing laws).",
        "linked_question_number": 41
    },
    {
        "fact_number": 42,
        "fact": "Objective territorial jurisdiction applies where the effect of an act is felt within the state, even if the act began elsewhere.",
        "linked_question_number": 42
    },
    {
        "fact_number": 43,
        "fact": "The universality principle permits jurisdiction over serious international crimes like piracy and genocide regardless of where they occurred.",
        "linked_question_number": 43
    },
    {
        "fact_number": 44,
        "fact": "Nationality establishes the legal bond between an individual and a state, forming the basis for rights and obligations.",
        "linked_question_number": 44
    },
    {
        "fact_number": 45,
        "fact": "Sovereign immunity has evolved from absolute immunity to restrictive immunity, distinguishing between sovereign acts and commercial acts.",
        "linked_question_number": 45
    },
    {
        "fact_number": 46,
        "fact": "Diplomatic and consular immunities protect officials from legal processes to ensure the efficient performance of their functions.",
        "linked_question_number": 46
    },
    {
        "fact_number": 47,
        "fact": "Article 33 of the UN Charter encourages peaceful settlement of disputes through negotiation, mediation, arbitration, and judicial settlement.",
        "linked_question_number": 47
    },
    {
        "fact_number": 48,
        "fact": "The International Court of Justice exercises both contentious jurisdiction (binding) and advisory jurisdiction (non-binding).",
        "linked_question_number": 48
    },
    {
        "fact_number": 49,
        "fact": "Article 2(4) of the United Nations Charter establishes a general prohibition on the threat or use of force by states.",
        "linked_question_number": 49
    },
    {
        "fact_number": 50,
        "fact": "Collective security involves coordinated action by the UN Security Council to maintain international peace and security.",
        "linked_question_number": 50
    }
];
const QUESTIONS_DB = [
    {
        "question_number": 1,
        "question": "The two-element theory of CIL is derived from which Article of the ICJ Statute?",
        "option_a": "Article 36",
        "option_b": "Article 38",
        "option_c": "Article 41",
        "answer": "Option B",
        "linked_fact_number": 1
    },
    {
        "question_number": 2,
        "question": "The Material/Objective Element of CIL requires state practice to be consistent and _____.",
        "option_a": "Voluntary",
        "option_b": "Widespread",
        "option_c": "Occasional",
        "answer": "Option B",
        "linked_fact_number": 2
    },
    {
        "question_number": 3,
        "question": "Opinio Juris refers to the belief that a practice is followed because it is _____ obligatory.",
        "option_a": "Morally",
        "option_b": "Politically",
        "option_c": "Legally",
        "answer": "Option C",
        "linked_fact_number": 3
    },
    {
        "question_number": 4,
        "question": "The phrase opinio juris sive necessitatis was first formulated by which jurist?",
        "option_a": "Hugo Grotius",
        "option_b": "François Gény",
        "option_c": "Hersch Lauterpacht",
        "answer": "Option B",
        "linked_fact_number": 4
    },
    {
        "question_number": 5,
        "question": "Unlike treaties, customary international law binds _____ states.",
        "option_a": "Only consenting",
        "option_b": "Only powerful",
        "option_c": "All",
        "answer": "Option C",
        "linked_fact_number": 5
    },
    {
        "question_number": 6,
        "question": "In the North Sea Continental Shelf Cases, Germany had not ratified which Convention?",
        "option_a": "The 1945 UN Charter",
        "option_b": "The 1958 Geneva Convention on the Continental Shelf",
        "option_c": "The 1982 UNCLOS",
        "answer": "Option B",
        "linked_fact_number": 6
    },
    {
        "question_number": 7,
        "question": "According to the ICJ in the North Sea Continental Shelf Cases, for a treaty rule to become custom, states must follow it with what?",
        "option_a": "Opinio Juris",
        "option_b": "Diplomatic notes",
        "option_c": "Domestic legislation",
        "answer": "Option A",
        "linked_fact_number": 7
    },
    {
        "question_number": 8,
        "question": "In the North Sea Continental Shelf Cases, the ICJ required delimitation to be based on _____ principles.",
        "option_a": "Equidistance",
        "option_b": "Equitable",
        "option_c": "Reciprocal",
        "answer": "Option B",
        "linked_fact_number": 8
    },
    {
        "question_number": 9,
        "question": "The Paquete Habana and Lola were seized during which war?",
        "option_a": "The American Civil War",
        "option_b": "The Spanish-American War",
        "option_c": "World War I",
        "answer": "Option B",
        "linked_fact_number": 9
    },
    {
        "question_number": 10,
        "question": "The Paquete Habana case is significant because it confirmed CIL applies in _____ courts.",
        "option_a": "International",
        "option_b": "Military",
        "option_c": "Domestic",
        "answer": "Option C",
        "linked_fact_number": 10
    },
    {
        "question_number": 11,
        "question": "Article 38 of the ICJ Statute was copied from the statute of which body?",
        "option_a": "The League of Nations",
        "option_b": "The Permanent Court of International Justice (PCIJ)",
        "option_c": "The United Nations General Assembly",
        "answer": "Option B",
        "linked_fact_number": 11
    },
    {
        "question_number": 12,
        "question": "The power under Article 38(2) to decide a case based on fairness is known as?",
        "option_a": "Ex aequo et bono",
        "option_b": "Pacta sunt servanda",
        "option_c": "Jus cogens",
        "answer": "Option A",
        "linked_fact_number": 12
    },
    {
        "question_number": 13,
        "question": "Which of the following is NOT a general principle of law under Article 38(1)(c)?",
        "option_a": "Good faith",
        "option_b": "Estoppel",
        "option_c": "Equidistance",
        "answer": "Option C",
        "linked_fact_number": 13
    },
    {
        "question_number": 14,
        "question": "Formal sources of international law define the _____ through which rules become legally binding.",
        "option_a": "Reason",
        "option_b": "Process",
        "option_c": "History",
        "answer": "Option B",
        "linked_fact_number": 14
    },
    {
        "question_number": 15,
        "question": "According to Hans Kelsen, international law can be defined solely by the ways in which its _____ are created.",
        "option_a": "States",
        "option_b": "Courts",
        "option_c": "Norms",
        "answer": "Option C",
        "linked_fact_number": 15
    },
    {
        "question_number": 16,
        "question": "Which Article of the Vienna Convention declares a treaty void if it conflicts with jus cogens?",
        "option_a": "Article 38",
        "option_b": "Article 53",
        "option_c": "Article 64",
        "answer": "Option B",
        "linked_fact_number": 16
    },
    {
        "question_number": 17,
        "question": "Which of the following is a recognized example of jus cogens?",
        "option_a": "The prohibition of double taxation",
        "option_b": "The prohibition of genocide",
        "option_c": "The right of innocent passage",
        "answer": "Option B",
        "linked_fact_number": 17
    },
    {
        "question_number": 18,
        "question": "A state can avoid being bound by an emerging custom if it consistently and persistently _____ it from the outset.",
        "option_a": "Ratifies",
        "option_b": "Objects",
        "option_c": "Accepts",
        "answer": "Option B",
        "linked_fact_number": 18
    },
    {
        "question_number": 19,
        "question": "In the Norwegian Fisheries Case, the UK's acquiescence meant it forfeited the right to _____.",
        "option_a": "Fish in Norwegian waters",
        "option_b": "Object to the baselines",
        "option_c": "Conclude a treaty",
        "answer": "Option B",
        "linked_fact_number": 19
    },
    {
        "question_number": 20,
        "question": "In Nicaragua v. USA, which UNGA Resolution was used as evidence of existing customary law?",
        "option_a": "Resolution 1514",
        "option_b": "Resolution 2625",
        "option_c": "Resolution 3314",
        "answer": "Option B",
        "linked_fact_number": 20
    },
    {
        "question_number": 21,
        "question": "The principle of pacta tertiis nec nocent nec prosunt means a treaty cannot bind a _____ state without consent.",
        "option_a": "Developing",
        "option_b": "Neutral",
        "option_c": "Third",
        "answer": "Option C",
        "linked_fact_number": 21
    },
    {
        "question_number": 22,
        "question": "Soft law instruments that are not formally binding can eventually harden into _____ law.",
        "option_a": "Domestic",
        "option_b": "Binding customary international",
        "option_c": "Regional",
        "answer": "Option B",
        "linked_fact_number": 22
    },
    {
        "question_number": 23,
        "question": "An entity that possesses international legal personality is called a _____ of international law.",
        "option_a": "Object",
        "option_b": "Subject",
        "option_c": "Party",
        "answer": "Option B",
        "linked_fact_number": 23
    },
    {
        "question_number": 24,
        "question": "The Reparations for Injuries Advisory Opinion (1949) confirmed that _____ can also be subjects of international law.",
        "option_a": "Multinational corporations",
        "option_b": "Non-governmental organisations",
        "option_c": "International organisations",
        "answer": "Option C",
        "linked_fact_number": 24
    },
    {
        "question_number": 25,
        "question": "Under the Montevideo Convention 1933, which of the following is NOT a criterion for statehood?",
        "option_a": "A permanent population",
        "option_b": "Recognition by the UN",
        "option_c": "An effective government",
        "answer": "Option B",
        "linked_fact_number": 25
    },
    {
        "question_number": 26,
        "question": "Who coined the term 'international law' in 1789?",
        "option_a": "Hugo Grotius",
        "option_b": "Jeremy Bentham",
        "option_c": "John Austin",
        "answer": "Option B",
        "linked_fact_number": 26
    },
    {
        "question_number": 27,
        "question": "According to John Austin, international law is not true 'law' because there is no sovereign backed by a threat of sanction.",
        "option_a": "It only applies during wartime",
        "option_b": "There is no sovereign commanding it backed by sanction",
        "option_c": "It has never been codified",
        "answer": "Option B",
        "linked_fact_number": 27
    },
    {
        "question_number": 28,
        "question": "Which principles established by the Peace of Westphalia remain the bedrock of international law today?",
        "option_a": "State sovereignty and non-interference",
        "option_b": "Universal human rights",
        "option_c": "Democratic governance",
        "answer": "Option A",
        "linked_fact_number": 28
    },
    {
        "question_number": 29,
        "question": "Why did the League of Nations ultimately fail?",
        "option_a": "The USA never joined and it could not prevent WWII",
        "option_b": "It was dissolved by the Security Council in 1930",
        "option_c": "It lacked any founding treaty",
        "answer": "Option A",
        "linked_fact_number": 29
    },
    {
        "question_number": 30,
        "question": "Which scholar observed that 'almost all nations observe almost all principles of international law almost all of the time'?",
        "option_a": "Hans Kelsen",
        "option_b": "Louis Henkin",
        "option_c": "H.L.A. Hart",
        "answer": "Option B",
        "linked_fact_number": 30
    },
    {
        "question_number": 31,
        "question": "Which legal instrument states that a country cannot use its domestic law to justify a breach of international law?",
        "option_a": "UN Charter",
        "option_b": "Vienna Convention on the Law of Treaties",
        "option_c": "Geneva Convention",
        "answer": "Option B",
        "linked_fact_number": 31
    },
    {
        "question_number": 32,
        "question": "According to dualist theory, international law becomes applicable domestically only when it is transformed into municipal law.",
        "option_a": "Approved by courts",
        "option_b": "Transformed into municipal law",
        "option_c": "Recognized by custom",
        "answer": "Option B",
        "linked_fact_number": 32
    },
    {
        "question_number": 33,
        "question": "Who is most closely associated with the monist theory of law?",
        "option_a": "Triepel",
        "option_b": "Anzilotti",
        "option_c": "Kelsen",
        "answer": "Option C",
        "linked_fact_number": 33
    },
    {
        "question_number": 34,
        "question": "In India, customary international law is applied when it does not conflict with domestic law.",
        "option_a": "It is part of the Constitution",
        "option_b": "It is ratified by Parliament",
        "option_c": "It does not conflict with domestic law",
        "answer": "Option C",
        "linked_fact_number": 34
    },
    {
        "question_number": 35,
        "question": "Which Article of the Indian Constitution empowers Parliament to implement international treaties?",
        "option_a": "Article 51",
        "option_b": "Article 253",
        "option_c": "Article 246",
        "answer": "Option B",
        "linked_fact_number": 35
    },
    {
        "question_number": 36,
        "question": "Which mode of acquiring territory refers to occupation of terra nullius?",
        "option_a": "Occupation",
        "option_b": "Cession",
        "option_c": "Prescription",
        "answer": "Option A",
        "linked_fact_number": 36
    },
    {
        "question_number": 37,
        "question": "Which principle prohibits acquisition of territory by force under modern international law?",
        "option_a": "Principle of Self-Determination",
        "option_b": "UN Charter Principle",
        "option_c": "Pacta Sunt Servanda",
        "answer": "Option B",
        "linked_fact_number": 37
    },
    {
        "question_number": 38,
        "question": "Which body is the principal judicial organ for resolving territorial disputes between states?",
        "option_a": "International Criminal Court",
        "option_b": "Permanent Court of Arbitration",
        "option_c": "International Court of Justice",
        "answer": "Option C",
        "linked_fact_number": 38
    },
    {
        "question_number": 39,
        "question": "Which concept emphasizes continuous and peaceful display of authority over territory?",
        "option_a": "Effective Control",
        "option_b": "Uti Possidetis",
        "option_c": "Occupation",
        "answer": "Option A",
        "linked_fact_number": 39
    },
    {
        "question_number": 40,
        "question": "Which convention deals with succession of states in respect of treaties?",
        "option_a": "Geneva Convention",
        "option_b": "Vienna Convention on Law of Treaties",
        "option_c": "Vienna Convention on State Succession",
        "answer": "Option C",
        "linked_fact_number": 40
    },
    {
        "question_number": 41,
        "question": "Which type of jurisdiction refers to the authority of a state to make laws?",
        "option_a": "Prescriptive jurisdiction",
        "option_b": "Adjudicative jurisdiction",
        "option_c": "Enforcement jurisdiction",
        "answer": "Option A",
        "linked_fact_number": 41
    },
    {
        "question_number": 42,
        "question": "Which type of territorial jurisdiction applies when the effect of an act is felt within a state?",
        "option_a": "Subjective territorial jurisdiction",
        "option_b": "Objective territorial jurisdiction",
        "option_c": "Protective jurisdiction",
        "answer": "Option B",
        "linked_fact_number": 42
    },
    {
        "question_number": 43,
        "question": "Which principle allows a state to exercise jurisdiction over crimes committed against its nationals abroad?",
        "option_a": "Nationality principle",
        "option_b": "Passive personality principle",
        "option_c": "Universality principle",
        "answer": "Option B",
        "linked_fact_number": 43
    },
    {
        "question_number": 44,
        "question": "Which concept distinguishes between sovereign and commercial acts for immunity purposes?",
        "option_a": "Absolute immunity",
        "option_b": "Restrictive immunity",
        "option_c": "Diplomatic immunity",
        "answer": "Option B",
        "linked_fact_number": 44
    },
    {
        "question_number": 45,
        "question": "Which international instrument deals with jurisdictional immunities of states?",
        "option_a": "Vienna Convention on Diplomatic Relations",
        "option_b": "UN Charter",
        "option_c": "UN Convention on Jurisdictional Immunities",
        "answer": "Option C",
        "linked_fact_number": 45
    },
    {
        "question_number": 46,
        "question": "Which Article of the UN Charter deals with peaceful settlement of disputes?",
        "option_a": "Article 2(4)",
        "option_b": "Article 33",
        "option_c": "Article 51",
        "answer": "Option B",
        "linked_fact_number": 46
    },
    {
        "question_number": 47,
        "question": "Which method of dispute settlement results in a binding legal decision?",
        "option_a": "Negotiation",
        "option_b": "Mediation",
        "option_c": "Arbitration",
        "answer": "Option C",
        "linked_fact_number": 47
    },
    {
        "question_number": 48,
        "question": "Which type of jurisdiction of the ICJ gives non-binding opinions?",
        "option_a": "Contentious jurisdiction",
        "option_b": "Advisory jurisdiction",
        "option_c": "Compulsory jurisdiction",
        "answer": "Option B",
        "linked_fact_number": 48
    },
    {
        "question_number": 49,
        "question": "Which provision of the UN Charter prohibits the use of force by states?",
        "option_a": "Article 51",
        "option_b": "Article 33",
        "option_c": "Article 2(4)",
        "answer": "Option C",
        "linked_fact_number": 49
    },
    {
        "question_number": 50,
        "question": "Which UN organ is primarily responsible for maintaining international peace and security?",
        "option_a": "UN General Assembly",
        "option_b": "International Court of Justice",
        "option_c": "UN Security Council",
        "answer": "Option C",
        "linked_fact_number": 50
    }
];

// --- WhatsApp Chat Data ---
window.whatsappChats = [
    {
        id: "gnlu-batch",
        name: "GNLU Batch of 2022-27",
        profilePic: "profile_pics/gnlu.png",
        type: "group",
        messages: [
            // April 3
            { sender: "Kabir", text: "Is jurisprudence cancelled today?", time: "09:15 AM", date: "2026-04-03", type: "text" },
            { sender: "Priya", text: "Dr. Singh just messaged the CR, yes it is.", time: "09:17 AM", date: "2026-04-03", type: "text" },
            { sender: "Kabir", text: "Let's goooo 🥳", time: "09:18 AM", date: "2026-04-03", type: "text" },
            { sender: "Yash", text: "Does anyone have the reading material for Company Law? The drive link is broken.", time: "10:30 AM", date: "2026-04-03", type: "text" },
            { sender: "Sneha", text: "Check the main class drive, I re-uploaded it yesterday.", time: "10:35 AM", date: "2026-04-03", type: "text" },
            { sender: "You", text: "Guys, look who followed me all the way to the hostel gate.", time: "11:20 AM", date: "2026-04-03", type: "text" },
            { sender: "You", text: "📸 image attached", time: "11:20 AM", date: "2026-04-03", type: "image", imgUrl: "https://images.bhaskarassets.com/web2images/960/2024/10/14/d19c362f-c348-43dc-a4db-bd1084442c621728881685259_1728882622.jpg" },
            { sender: "Aditi", text: "Omg so cute! Is that from the GNLU Floofs?", time: "11:25 AM", date: "2026-04-03", type: "text" },
            { sender: "Karan", text: "Yeah that's Buddy. He usually hangs out near the admin block.", time: "11:30 AM", date: "2026-04-03", type: "text" },
            { sender: "Dev", text: "Can someone proxy for me in Environmental Law?", time: "01:45 PM", date: "2026-04-03", type: "text" },
            { sender: "Rohan", text: "Bro he's taking manual attendance today, don't risk it.", time: "01:46 PM", date: "2026-04-03", type: "text" },
            // April 4
            { sender: "Ananya", text: "What's in the mess for dinner?", time: "07:10 PM", date: "2026-04-04", type: "text" },
            { sender: "Kabir", text: "Paneer, but it looks like rubber.", time: "07:15 PM", date: "2026-04-04", type: "text" },
            { sender: "Yash", text: "I'm ordering from outside. Anyone wants to pool in for Dominos?", time: "07:20 PM", date: "2026-04-04", type: "text" },
            { sender: "Priya", text: "Count me in. Margerita please.", time: "07:21 PM", date: "2026-04-04", type: "text" },
            { sender: "You", text: "I'll take a farmhouse. Gpay'd you 300.", time: "07:25 PM", date: "2026-04-04", type: "text" },
            { sender: "Karan", text: "Did everyone submit the Moots draft?", time: "11:00 PM", date: "2026-04-04", type: "text" },
            { sender: "Aditi", text: "It's due tomorrow night right?? Don't scare me.", time: "11:02 PM", date: "2026-04-04", type: "text" },
            { sender: "Sneha", text: "Yes it's tomorrow 11:59 PM. Chill.", time: "11:05 PM", date: "2026-04-04", type: "text" },
            { sender: "Dev", text: "Thank god. I haven't even started formatting.", time: "11:10 PM", date: "2026-04-04", type: "text" },
            // April 5
            { sender: "CR - Rahul", text: "Reminder: Extra lecture for CrPC tomorrow at 8 AM in Seminar Hall 2.", time: "04:30 PM", date: "2026-04-05", type: "text" },
            { sender: "Kabir", text: "8 AM on a Saturday should be illegal.", time: "04:32 PM", date: "2026-04-05", type: "text" },
            { sender: "Ananya", text: "Agreed. I am not waking up.", time: "04:35 PM", date: "2026-04-05", type: "text" },
            { sender: "You", text: "Hey, are we still doing the movie night later?", time: "06:00 PM", date: "2026-04-05", type: "text" },
            { sender: "Priya", text: "Yes! Setting it up now.", time: "06:05 PM", date: "2026-04-05", type: "text" },
            { sender: "Priya", text: "📸 image attached", time: "06:10 PM", date: "2026-04-05", type: "image", imgUrl: "https://gnlu.ac.in//Document/photo-gallery/Law-And-Society/L_29f4db94-9f78-4659-9b30-d56fa18af7d3.jpeg" },
            { sender: "Yash", text: "Wait, which classroom is this?", time: "06:12 PM", date: "2026-04-05", type: "text" },
            { sender: "Priya", text: "Classroom 4, ground floor.", time: "06:15 PM", date: "2026-04-05", type: "text" },
            { sender: "Rohan", text: "I'll bring chips.", time: "06:20 PM", date: "2026-04-05", type: "text" },
            // April 6
            { sender: "Dev", text: "Is the Wi-Fi down for anyone else in the Boys Hostel?", time: "09:00 AM", date: "2026-04-06", type: "text" },
            { sender: "Kabir", text: "Always. Use your hotspot.", time: "09:05 AM", date: "2026-04-06", type: "text" },
            { sender: "You", text: "It's working in the library if you need to submit the assignment.", time: "09:10 AM", date: "2026-04-06", type: "text" },
            { sender: "Ananya", text: "Did the admin send the schedule for end-sems yet?", time: "11:30 AM", date: "2026-04-06", type: "text" },
            { sender: "CR - Rahul", text: "Not yet, they said by Wednesday.", time: "11:35 AM", date: "2026-04-06", type: "text" },
            { sender: "Sneha", text: "Watch them give us exactly 1 prep day between the hardest subjects.", time: "11:40 AM", date: "2026-04-06", type: "text" },
            { sender: "Karan", text: "Don't jinx it pls.", time: "11:45 AM", date: "2026-04-06", type: "text" },
            // April 7
            { sender: "Yash", text: "Guys, library is completely full. Where else can I study?", time: "02:15 PM", date: "2026-04-07", type: "text" },
            { sender: "Priya", text: "Try the reading room on the second floor, usually empty.", time: "02:20 PM", date: "2026-04-07", type: "text" },
            { sender: "Dev", text: "I lost my ID card near the juice shop. If anyone finds it let me know.", time: "04:00 PM", date: "2026-04-07", type: "text" },
            { sender: "You", text: "I think the security guard at the main gate had one. Check with him.", time: "04:10 PM", date: "2026-04-07", type: "text" },
            { sender: "CR - Rahul", text: "Hey everyone, submit your elective choices by tonight 8 PM. Form closes strictly.", time: "05:00 PM", date: "2026-04-07", type: "text" },
            { sender: "Kabir", text: "Thanks for the reminder bro.", time: "05:05 PM", date: "2026-04-07", type: "text" }
        ]
    },
    {
        id: "sac-core",
        name: "SAC Core Comm 25-26",
        profilePic: "profile_pics/sac.png",
        type: "group",
        messages: [
            // April 3
            { sender: "President - Varun", text: "Team, Pravah posters are ready. We need maximum reach.", time: "10:00 AM", date: "2026-04-03", type: "text" },
            { sender: "PR Head - Riya", text: "Here is the final version. Everyone tag your batchmates and post on stories.", time: "10:05 AM", date: "2026-04-03", type: "text" },
            { sender: "PR Head - Riya", text: "📸 image attached", time: "10:06 AM", date: "2026-04-03", type: "image", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaKwiP-9Qrg_9BGU58jnlbK5G1CUu1bc22qA&s" },
            { sender: "You", text: "Looks amazing! Sharing it right away.", time: "10:15 AM", date: "2026-04-03", type: "text" },
            { sender: "Logistics - Aman", text: "Have we sorted the sound system vendor for Pravah yet?", time: "11:30 AM", date: "2026-04-03", type: "text" },
            { sender: "VP - Neha", text: "Yes, contract is signed. They will be on campus by 3 PM tomorrow for setup.", time: "11:35 AM", date: "2026-04-03", type: "text" },
            { sender: "Faculty Adv - Dr. Sharma", text: "Please ensure the volume is strictly lowered after 10 PM. The Registrar was very clear about this.", time: "12:00 PM", date: "2026-04-03", type: "text" },
            { sender: "President - Varun", text: "Noted, sir. We will strictly monitor the decibel levels.", time: "12:05 PM", date: "2026-04-03", type: "text" },
            // April 4
            { sender: "PR Head - Riya", text: "Guys, moving on to Pentagram. I have a draft poster.", time: "02:00 PM", date: "2026-04-04", type: "text" },
            { sender: "PR Head - Riya", text: "📸 image attached", time: "02:01 PM", date: "2026-04-04", type: "image", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfcT54W32l2sOyQZLoMrMLBFL3HvgFQ7tsFQ&s" },
            { sender: "You", text: "Wait, the date on the poster says 15th instead of 18th.", time: "02:10 PM", date: "2026-04-04", type: "text" },
            { sender: "Logistics - Aman", text: "Good catch. Please fix that before it goes to print.", time: "02:15 PM", date: "2026-04-04", type: "text" },
            { sender: "PR Head - Riya", text: "Ah my bad, fixing it right now.", time: "02:20 PM", date: "2026-04-04", type: "text" },
            { sender: "Faculty Adv - Dr. Sharma", text: "The sponsorship logos at the bottom need to be larger. They are paying a premium.", time: "03:00 PM", date: "2026-04-04", type: "text" },
            { sender: "PR Head - Riya", text: "Will do, sir.", time: "03:05 PM", date: "2026-04-04", type: "text" },
            { sender: "VP - Neha", text: "Who is coordinating the volunteer passes?", time: "05:30 PM", date: "2026-04-04", type: "text" },
            { sender: "You", text: "I am handling the backend list. Just waiting for the final 1st-year list.", time: "05:35 PM", date: "2026-04-04", type: "text" },
            // April 5
            { sender: "President - Varun", text: "Concert stage setup has started!", time: "09:00 AM", date: "2026-04-05", type: "text" },
            { sender: "President - Varun", text: "📸 image attached", time: "09:01 AM", date: "2026-04-05", type: "image", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKnqfMaYFK-c_9Rs4BYgZ5klQxe_MusQF3nA&s" },
            { sender: "You", text: "Looks massive! The lighting rig is way better than last year.", time: "09:10 AM", date: "2026-04-05", type: "text" },
            { sender: "Logistics - Aman", text: "I'm at the gate. The caterers are arguing about entry passes.", time: "10:30 AM", date: "2026-04-05", type: "text" },
            { sender: "VP - Neha", text: "Coming there right now. Don't let them leave.", time: "10:35 AM", date: "2026-04-05", type: "text" },
            { sender: "Faculty Adv - Dr. Sharma", text: "The security team informed me of a commotion at the gate. Is it resolved?", time: "11:00 AM", date: "2026-04-05", type: "text" },
            { sender: "Logistics - Aman", text: "Yes sir, just a misunderstanding with the vehicle numbers. Sorted.", time: "11:05 AM", date: "2026-04-05", type: "text" },
            { sender: "PR Head - Riya", text: "Just posted the countdown reel on Insta. Everyone comment and hype it up!", time: "02:00 PM", date: "2026-04-05", type: "text" },
            // April 6
            { sender: "You", text: "I have compiled the final budget sheets for the printing expenses.", time: "11:00 AM", date: "2026-04-06", type: "text" },
            { sender: "President - Varun", text: "Great, bring it to the SAC room at 1 PM for signatures.", time: "11:15 AM", date: "2026-04-06", type: "text" },
            { sender: "VP - Neha", text: "Are we over budget on the barricading?", time: "11:20 AM", date: "2026-04-06", type: "text" },
            { sender: "You", text: "Slightly, by about 5k. I can pull that from the miscellaneous fund if needed.", time: "11:25 AM", date: "2026-04-06", type: "text" },
            { sender: "Logistics - Aman", text: "Do it. We need extra barricades near the VIP seating area.", time: "11:30 AM", date: "2026-04-06", type: "text" },
            { sender: "Faculty Adv - Dr. Sharma", text: "I have reviewed the budget. The reallocation is approved.", time: "01:45 PM", date: "2026-04-06", type: "text" },
            // April 7
            { sender: "President - Varun", text: "Guys, amazing job yesterday. Everything went smoothly.", time: "10:00 AM", date: "2026-04-07", type: "text" },
            { sender: "Faculty Adv - Dr. Sharma", text: "I must commend the entire committee. The coordination was excellent, and the discipline was maintained perfectly. Well done SAC.", time: "10:15 AM", date: "2026-04-07", type: "text" },
            { sender: "You", text: "Thank you so much, sir!", time: "10:20 AM", date: "2026-04-07", type: "text" },
            { sender: "VP - Neha", text: "Thanks sir! Couldn't have done it without the backend team.", time: "10:25 AM", date: "2026-04-07", type: "text" },
            { sender: "PR Head - Riya", text: "Taking a well-deserved nap now. Wake me up in 2027.", time: "10:30 AM", date: "2026-04-07", type: "text" },
            { sender: "Logistics - Aman", text: "Lol same.", time: "10:35 AM", date: "2026-04-07", type: "text" }
        ]
    },
    {
        id: "lsc-committee",
        name: "LSC Official",
        profilePic: "profile_pics/lsc.png",
        type: "group",
        messages: [
            // April 3
            { sender: "Convenor - Ishaan", text: "Hello team, the banner for the Annual Conference is up at the main gate.", time: "09:00 AM", date: "2026-04-03", type: "text" },
            { sender: "Convenor - Ishaan", text: "📸 image attached", time: "09:01 AM", date: "2026-04-03", type: "image", imgUrl: "https://substackcdn.com/image/fetch/$s_!hACe!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F07a67a36-452b-47ef-bcc0-80ff660ca217_866x562.png" },
            { sender: "Co-Convenor - Tara", text: "Looks great! Have all the invitations to the speakers been confirmed?", time: "09:15 AM", date: "2026-04-03", type: "text" },
            { sender: "You", text: "Yes, flights are booked and accommodations at the guest house are sorted.", time: "09:20 AM", date: "2026-04-03", type: "text" },
            { sender: "Faculty In-charge - Prof. Das", text: "Ensure the travel itinerary is sent to them by tonight.", time: "09:30 AM", date: "2026-04-03", type: "text" },
            { sender: "You", text: "Will mail it to them by 5 PM today, ma'am.", time: "09:35 AM", date: "2026-04-03", type: "text" },
            { sender: "Drive Coord - Sarthak", text: "Who is joining the pro-bono survey near Koba village tomorrow?", time: "12:00 PM", date: "2026-04-03", type: "text" },
            { sender: "Meera", text: "I'll be there. Should we carry the Gujarati translated forms?", time: "12:05 PM", date: "2026-04-03", type: "text" },
            { sender: "Drive Coord - Sarthak", text: "Yes, please pick up a stack from the LSC room.", time: "12:10 PM", date: "2026-04-03", type: "text" },
            // April 4
            { sender: "Co-Convenor - Tara", text: "The POSH awareness session going really well. Amazing turnout.", time: "04:00 PM", date: "2026-04-04", type: "text" },
            { sender: "Co-Convenor - Tara", text: "📸 image attached", time: "04:01 PM", date: "2026-04-04", type: "image", imgUrl: "https://gnlu.ac.in//Content/gnlu/images/gender/posh4.jpg" },
            { sender: "Convenor - Ishaan", text: "Brilliant. Make sure you get feedback forms filled out at the end.", time: "04:10 PM", date: "2026-04-04", type: "text" },
            { sender: "You", text: "Already distributed the QR codes on the desks.", time: "04:15 PM", date: "2026-04-04", type: "text" },
            { sender: "Faculty In-charge - Prof. Das", text: "I am impressed with the decorum. Keep it up.", time: "04:45 PM", date: "2026-04-04", type: "text" },
            { sender: "Drive Coord - Sarthak", text: "Just a reminder, the bus for the education drive leaves at 8 AM sharp tomorrow. Don't be late.", time: "08:00 PM", date: "2026-04-04", type: "text" },
            { sender: "Meera", text: "Got it.", time: "08:05 PM", date: "2026-04-04", type: "text" },
            // April 5
            { sender: "Drive Coord - Sarthak", text: "Kids loved the basic rights session today!", time: "01:00 PM", date: "2026-04-05", type: "text" },
            { sender: "Drive Coord - Sarthak", text: "📸 image attached", time: "01:01 PM", date: "2026-04-05", type: "image", imgUrl: "https://pbs.twimg.com/media/FnxTq1DaUAEiUME.jpg" },
            { sender: "Convenor - Ishaan", text: "This is what LSC is all about ❤️ Great job guys.", time: "01:10 PM", date: "2026-04-05", type: "text" },
            { sender: "You", text: "It was really fulfilling. They asked so many smart questions.", time: "01:15 PM", date: "2026-04-05", type: "text" },
            { sender: "Co-Convenor - Tara", text: "Did you guys distribute the stationary kits?", time: "01:20 PM", date: "2026-04-05", type: "text" },
            { sender: "Meera", text: "Yes, every student got a kit.", time: "01:25 PM", date: "2026-04-05", type: "text" },
            { sender: "Faculty In-charge - Prof. Das", text: "Please submit a brief 2-page report of today's drive by Monday.", time: "02:00 PM", date: "2026-04-05", type: "text" },
            { sender: "Drive Coord - Sarthak", text: "Will draft it tonight ma'am.", time: "02:05 PM", date: "2026-04-05", type: "text" },
            // April 6
            { sender: "You", text: "Taking the conference delegates for a tour of the Legal History Museum.", time: "11:00 AM", date: "2026-04-06", type: "text" },
            { sender: "You", text: "📸 image attached", time: "11:01 AM", date: "2026-04-06", type: "image", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh8ceIjRluy_Fx5tls1Ile8Rexd4D2OtFFPA&s" },
            { sender: "Convenor - Ishaan", text: "Make sure they see the original Constituent Assembly debate transcripts section.", time: "11:15 AM", date: "2026-04-06", type: "text" },
            { sender: "You", text: "Already showed them! They were very fascinated by the 3D campus model though.", time: "11:20 AM", date: "2026-04-06", type: "text" },
            { sender: "Co-Convenor - Tara", text: "Lunch will be served in the VIP dining hall at 1 PM.", time: "11:30 AM", date: "2026-04-06", type: "text" },
            { sender: "Meera", text: "Are there vegetarian options confirmed for the Chief Guest?", time: "11:35 AM", date: "2026-04-06", type: "text" },
            { sender: "Co-Convenor - Tara", text: "Yes, fully veg spread is arranged.", time: "11:40 AM", date: "2026-04-06", type: "text" },
            // April 7
            { sender: "Faculty In-charge - Prof. Das", text: "The Annual Conference concluded beautifully. Thank you to the core committee and all volunteers.", time: "09:00 AM", date: "2026-04-07", type: "text" },
            { sender: "Convenor - Ishaan", text: "Thank you for your guidance, ma'am.", time: "09:10 AM", date: "2026-04-07", type: "text" },
            { sender: "Drive Coord - Sarthak", text: "We received a new pro-bono request from the Legal Aid Clinic. Someone needs help drafting an RTI.", time: "02:00 PM", date: "2026-04-07", type: "text" },
            { sender: "You", text: "I can take that up. Send me the details.", time: "02:10 PM", date: "2026-04-07", type: "text" },
            { sender: "Drive Coord - Sarthak", text: "Sending the file to you on personal chat.", time: "02:15 PM", date: "2026-04-07", type: "text" },
            { sender: "Co-Convenor - Tara", text: "Also guys, clean up the LSC room by tomorrow. It looks like a hurricane hit it.", time: "04:00 PM", date: "2026-04-07", type: "text" },
            { sender: "Meera", text: "On it 😂", time: "04:05 PM", date: "2026-04-07", type: "text" }
        ]
    },
    {
        id: "kuhu",
        name: "Kuhu",
        profilePic: "profile_pics/Kuhu.png",
        type: "personal",
        messages: [
            { sender: "Kuhu", text: "Hey! Are we still on for lunch?", time: "12:30 PM", date: "2026-04-06", type: "text" },
            { sender: "You", text: "Yes! Meet you near the mess in 10 mins.", time: "12:32 PM", date: "2026-04-06", type: "text" },
            { sender: "Kuhu", text: "Okay cool. Can you bring my notebook too?", time: "12:35 PM", date: "2026-04-06", type: "text" },
            { sender: "You", text: "Got it.", time: "12:38 PM", date: "2026-04-06", type: "text" },
            { sender: "Kuhu", text: "Did you finish the assignment yet?", time: "08:15 PM", date: "2026-04-07", type: "text" },
            { sender: "You", text: "Almost, just need to add citations.", time: "08:20 PM", date: "2026-04-07", type: "text" }
        ]
    },
    {
        id: "aalok",
        name: "Aalok",
        profilePic: "profile_pics/Aalok.png",
        type: "personal",
        messages: [
            { sender: "Aalok", text: "Bro did you see the email from the admin?", time: "10:00 AM", date: "2026-04-06", type: "text" },
            { sender: "You", text: "Yeah, the one about the parking pass?", time: "10:10 AM", date: "2026-04-06", type: "text" },
            { sender: "Aalok", text: "Yes. I need to get mine renewed.", time: "10:15 AM", date: "2026-04-06", type: "text" },
            { sender: "You", text: "Same here. Let's go together after class.", time: "10:20 AM", date: "2026-04-06", type: "text" },
            { sender: "Aalok", text: "Done. See you at the admin block.", time: "10:25 AM", date: "2026-04-06", type: "text" }
        ]
    },
    {
        id: "aaveksha",
        name: "Aaveksha",
        profilePic: "profile_pics/Aaveksha.png",
        type: "personal",
        messages: [
            { sender: "Aaveksha", text: "Are you going to the library today?", time: "02:00 PM", date: "2026-04-07", type: "text" },
            { sender: "You", text: "Probably around 4 PM. Why?", time: "02:15 PM", date: "2026-04-07", type: "text" },
            { sender: "Aaveksha", text: "Can you save me a seat? The reading room gets full so fast.", time: "02:20 PM", date: "2026-04-07", type: "text" },
            { sender: "You", text: "Sure, I'll try to grab one near the windows.", time: "02:25 PM", date: "2026-04-07", type: "text" },
            { sender: "Aaveksha", text: "Thanks a lot!", time: "02:30 PM", date: "2026-04-07", type: "text" }
        ]
    }
];