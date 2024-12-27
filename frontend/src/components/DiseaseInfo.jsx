import { useState } from "react";
import Navbar from "./Navbar";

const DiseaseInfo = () => {
  const [disease, setDisease] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Disease data array with one disease (Malaria)
  const diseasesData = [
    {
      name: "Malaria",
      description:
        "Malaria is a serious and sometimes fatal disease caused by Plasmodium parasites. It is transmitted through the bite of infected Anopheles mosquitoes.",
      symptoms: [
        "Fever and chills",
        "Headache",
        "Sweating",
        "Fatigue",
        "Nausea and vomiting",
        "Muscle pain",
        "Enlarged spleen",
      ],
      causes:
        "Malaria is caused by a parasite transmitted by the bite of an infected Anopheles mosquito.",
      riskFactors:
        "People in malaria-endemic areas, pregnant women, and young children are at higher risk.",
      treatment:
        "Antimalarial medications like chloroquine, ACTs, and intravenous medications for severe cases.",
      prescription: {
        tablets: "Chloroquine 250mg",
        bottles: "ACT (Artemisinin Combination Therapy) 1 bottle",
      },
    },
    {
      name: "Chickenpox",
      description:
        "Chickenpox is a highly contagious viral infection caused by the varicella-zoster virus, leading to an itchy rash with red spots and fluid-filled blisters.",
      symptoms: [
        "Itchy rash",
        "Fever",
        "Fatigue",
        "Loss of appetite",
        "Headache",
        "Muscle aches",
      ],
      causes:
        "Chickenpox is caused by the varicella-zoster virus, which spreads through respiratory droplets and direct contact with the rash.",
      riskFactors:
        "People who have not been vaccinated, young children, and individuals with weakened immune systems are at higher risk.",
      treatment:
        "Treatment involves symptomatic relief, such as antihistamines for itching, and antiviral medications for severe cases.",
      prescription: {
        tablets: "Acyclovir 400mg",
        bottles: "Calamine Lotion 250ml",
      },
    },
    {
      name: "Indigestion",
      description: "Discomfort in the stomach often after eating.",
      symptoms: ["Bloating", "Nausea", "Belching", "Heartburn"],
      causes: "Overeating, spicy or fatty foods, stress.",
      riskFactors: "Large meals, alcohol, stress.",
      treatment: "Antacids, smaller meals, avoiding trigger foods.",
      prescription: {
        tablets: "Ranitidine 150mg",
        syrups: "Antacid syrup",
      },
    },
    {
      name: "Bronchitis",
      description: "Inflammation of the bronchial tubes.",
      symptoms: ["Coughing", "Mucus production", "Chest discomfort"],
      causes: "Viral infections, pollutants, smoking.",
      riskFactors: "Smoking, air pollution, viral infections.",
      treatment: "Rest, hydration, cough suppressants.",
      prescription: {
        tablets: "Dextromethorphan 10mg",
        syrups: "Cough syrup as needed",
      },
    },
    {
      name: "Ringworm",
      description: "A fungal infection causing a ring-like rash.",
      symptoms: ["Itchy red patches", "Circular rash", "Scaly skin"],
      causes: "Fungal infection, close contact with infected person or animal.",
      riskFactors: "Close contact, humid environment.",
      treatment: "Topical antifungal creams, keeping skin dry.",
      prescription: {
        creams: "Clotrimazole cream",
        powders: "Antifungal powder",
      },
    },
    {
      name: "Cold Sores",
      description:
        "Small blisters around the mouth caused by the herpes virus.",
      symptoms: ["Blisters", "Itching", "Burning sensation"],
      causes: "Herpes simplex virus (HSV-1).",
      riskFactors: "Stress, weakened immunity, cold weather.",
      treatment: "Antiviral creams, avoiding trigger factors.",
      prescription: {
        creams: "Acyclovir cream",
        tablets: "Valacyclovir (if prescribed)",
      },
    },
    {
      name: "Mouth Ulcers",
      description: "Small sores in the mouth causing pain.",
      symptoms: ["Painful sore", "Swelling", "Difficulty eating"],
      causes: "Stress, injury, acidic foods.",
      riskFactors: "Stress, certain foods, injury to mouth.",
      treatment: "Avoiding spicy/acidic foods, topical ointments.",
      prescription: {
        gels: "Benzocaine gel",
        mouthwashes: "Antiseptic mouthwash",
      },
    },
    {
      name: "Dry Eyes",
      description: "Lack of sufficient moisture in the eyes.",
      symptoms: ["Burning", "Itching", "Sensitivity to light"],
      causes: "Aging, screen time, dry environment.",
      riskFactors: "Age, prolonged screen time, air conditioning.",
      treatment: "Artificial tears, reducing screen time.",
      prescription: {
        drops: "Artificial tears",
        gels: "Lubricating eye gel",
      },
    },
    {
      name: "Eczema",
      description: "Skin condition causing redness and itching.",
      symptoms: ["Itchy patches", "Redness", "Dry skin"],
      causes: "Genetic factors, allergens.",
      riskFactors: "Family history, allergies.",
      treatment: "Moisturizers, topical creams.",
      prescription: {
        creams: "Hydrocortisone cream",
        lotions: "Moisturizing lotion",
      },
    },
    {
      name: "Food Poisoning",
      description: "Illness caused by contaminated food or drink.",
      symptoms: ["Nausea", "Vomiting", "Diarrhea", "Fever"],
      causes: "Bacteria, viruses, or toxins in food.",
      riskFactors: "Improperly stored food, undercooked food.",
      treatment: "Hydration, bland diet, rest.",
      prescription: {
        tablets: "Ondansetron 4mg",
        liquids: "Oral rehydration solution",
      },
    },
    {
      name: "Migraine",
      description: "Intense headache often accompanied by nausea.",
      symptoms: ["Severe headache", "Sensitivity to light", "Nausea"],
      causes: "Stress, hormones, certain foods.",
      riskFactors: "Genetics, stress, hormonal changes.",
      treatment: "Pain relievers, quiet environment.",
      prescription: {
        tablets: "Sumatriptan 50mg",
        syrups: "Metoclopramide (if prescribed for nausea)",
      },
    },
    {
      name: "Scabies",
      description: "A skin infestation caused by mites.",
      symptoms: ["Itchy rash", "Small blisters", "Burrow marks on skin"],
      causes: "Sarcoptes scabiei mite.",
      riskFactors: "Close contact, poor hygiene.",
      treatment: "Topical creams, washing clothes and bedding.",
      prescription: {
        creams: "Permethrin cream",
        tablets: "Ivermectin (if prescribed)",
      },
    },
    {
      name: "Stye",
      description:
        "A small, painful lump on the eyelid caused by a blocked gland.",
      symptoms: ["Red bump", "Swelling", "Pain"],
      causes: "Bacterial infection, blocked oil gland.",
      riskFactors: "Poor hygiene, touching eyes with dirty hands.",
      treatment: "Warm compresses, topical antibiotics.",
      prescription: {
        ointments: "Erythromycin ointment",
        drops: "Antibiotic eye drops",
      },
    },
    {
      name: "Athlete’s Itch",
      description: "A fungal infection around the groin area.",
      symptoms: ["Itchy rash", "Redness", "Scaly skin"],
      causes: "Fungal infection due to sweat and friction.",
      riskFactors: "Warm, moist environment, tight clothing.",
      treatment: "Antifungal creams, keeping area dry.",
      prescription: {
        creams: "Terbinafine cream",
        powders: "Antifungal powder",
      },
    },
    {
      name: "Constipation",
      description: "Difficulty in passing stool.",
      symptoms: ["Infrequent bowel movements", "Hard stools", "Bloating"],
      causes: "Low fiber diet, dehydration.",
      riskFactors: "Low fiber intake, lack of exercise.",
      treatment: "High fiber diet, hydration.",
      prescription: {
        tablets: "Lactulose 15ml",
        powders: "Psyllium fiber",
      },
    },
    {
      name: "Nosebleed",
      description: "Bleeding from the nose, often due to dryness or injury.",
      symptoms: ["Bleeding from nostrils"],
      causes: "Dry air, picking nose, trauma.",
      riskFactors: "Dry climate, allergies.",
      treatment: "Pinching nose, using a humidifier.",
      prescription: {
        sprays: "Saline nasal spray",
        gels: "Nasal moisturizing gel",
      },
    },
    {
      name: "Hives",
      description: "Red, itchy welts caused by an allergic reaction.",
      symptoms: ["Red welts", "Itching", "Swelling"],
      causes: "Allergic reaction to food, medicine, or environment.",
      riskFactors: "Allergies, certain medications.",
      treatment: "Antihistamines, avoiding allergens.",
      prescription: {
        tablets: "Loratadine 10mg",
        creams: "Calamine lotion",
      },
    },
    {
      name: "Sunburn",
      description: "Skin damage from excessive sun exposure.",
      symptoms: ["Red skin", "Pain", "Blisters", "Peeling"],
      causes: "Exposure to UV rays without protection.",
      riskFactors: "Prolonged sun exposure, fair skin.",
      treatment: "Aloe vera gel, moisturizing, pain relief.",
      prescription: {
        creams: "Aloe vera gel",
        tablets: "Ibuprofen 200mg",
      },
    },
    {
      name: "Insomnia",
      description: "Difficulty falling or staying asleep.",
      symptoms: ["Sleeplessness", "Fatigue", "Irritability"],
      causes: "Stress, anxiety, irregular sleep schedule.",
      riskFactors: "Stress, irregular routines.",
      treatment: "Sleep hygiene practices, relaxation techniques.",
      prescription: {
        tablets: "Melatonin supplement",
        teas: "Chamomile tea",
      },
    },
    {
      name: "Nail Fungus",
      description: "Fungal infection affecting the nails.",
      symptoms: ["Yellow or white nails", "Thickened nails", "Brittle nails"],
      causes: "Fungal infection, moisture exposure.",
      riskFactors: "Swimming, sweaty feet, nail injury.",
      treatment: "Antifungal creams, oral antifungals (if severe).",
      prescription: {
        creams: "Terbinafine cream",
        tablets: "Fluconazole 150mg (if prescribed)",
      },
    },
    {
      name: "Shingles",
      description:
        "Painful rash caused by reactivation of the chickenpox virus.",
      symptoms: ["Painful rash", "Blisters", "Tingling sensation"],
      causes: "Reactivation of varicella-zoster virus.",
      riskFactors: "Older age, weakened immune system.",
      treatment: "Antiviral medications, pain relievers.",
      prescription: {
        tablets: "Acyclovir 800mg",
        creams: "Calamine lotion",
      },
    },
    {
      name: "Motion Sickness",
      description: "Nausea and dizziness from motion in vehicles.",
      symptoms: ["Nausea", "Dizziness", "Sweating", "Vomiting"],
      causes: "Motion disrupting balance in the inner ear.",
      riskFactors: "Travel, sensitive inner ear.",
      treatment: "Avoiding heavy meals, medication for nausea.",
      prescription: {
        tablets: "Dimenhydrinate 50mg",
        gums: "Ginger gum",
      },
    },
    {
      name: "Hepatitis B",
      description:
        "Hepatitis B is a viral infection that attacks the liver, potentially leading to chronic liver disease or liver cancer.",
      symptoms: [
        "Fatigue",
        "Abdominal pain",
        "Jaundice",
        "Dark urine",
        "Loss of appetite",
        "Nausea",
      ],
      causes:
        "Hepatitis B is caused by the Hepatitis B virus, which spreads through contact with infected bodily fluids.",
      riskFactors:
        "People with unprotected sex, those who share needles, and healthcare workers are at higher risk.",
      treatment: "Antiviral medications and vaccines for prevention.",
      prescription: {
        tablets: "Lamivudine 100mg",
        bottles: "Interferon Injection 5 million IU",
      },
    },
    {
      name: "Gastroenteritis",
      description:
        "Gastroenteritis is an infection of the stomach and intestines, often caused by a virus or bacteria, resulting in vomiting and diarrhea.",
      symptoms: [
        "Diarrhea",
        "Vomiting",
        "Abdominal cramps",
        "Fever",
        "Headache",
        "Dehydration",
      ],
      causes:
        "Gastroenteritis is commonly caused by viruses (like norovirus) or bacteria (like Salmonella or E. coli).",
      riskFactors:
        "Young children, elderly individuals, and people with weakened immune systems are at higher risk.",
      treatment:
        "Hydration, electrolytes, and anti-nausea medications. Antibiotics may be needed for bacterial infections.",
      prescription: {
        tablets: "Loperamide 2mg",
        bottles: "Oral Rehydration Solution 500ml",
      },
    },
    {
      name: "Pneumococcal Disease",
      description:
        "Pneumococcal disease refers to infections caused by the bacterium Streptococcus pneumoniae, including pneumonia, meningitis, and bloodstream infections.",
      symptoms: [
        "Cough",
        "Fever",
        "Shortness of breath",
        "Chest pain",
        "Headache",
        "Stiff neck",
      ],
      causes:
        "Pneumococcal disease is caused by Streptococcus pneumoniae bacteria, which spread through respiratory droplets.",
      riskFactors:
        "Young children, elderly individuals, and people with weakened immune systems are more vulnerable.",
      treatment:
        "Antibiotics such as penicillin or ceftriaxone are used to treat pneumococcal infections.",
      prescription: {
        tablets: "Amoxicillin 500mg",
        bottles: "Ceftriaxone Injection 1g",
      },
    },
    {
      name: "Shingles",
      description:
        "Shingles is a viral infection caused by the varicella-zoster virus, which reactivates after a person has had chickenpox, causing a painful rash.",
      symptoms: [
        "Painful rash",
        "Blisters",
        "Itching",
        "Burning or tingling sensation",
        "Fever",
        "Headache",
      ],
      causes:
        "Shingles is caused by the reactivation of the varicella-zoster virus, which remains dormant in nerve cells after a person has had chickenpox.",
      riskFactors:
        "Older adults and individuals with weakened immune systems are at higher risk of developing shingles.",
      treatment:
        "Antiviral medications and pain relievers to alleviate symptoms.",
      prescription: {
        tablets: "Acyclovir 800mg",
        bottles: "Lidocaine 5% Gel",
      },
    },
    {
      name: "Leukemia",
      description:
        "Leukemia is a type of cancer that affects blood and bone marrow, characterized by an overproduction of abnormal white blood cells.",
      symptoms: [
        "Fatigue",
        "Easy bruising or bleeding",
        "Fever",
        "Frequent infections",
        "Swollen lymph nodes",
      ],
      causes:
        "Leukemia is caused by mutations in the DNA of blood cells that lead to uncontrolled growth.",
      riskFactors:
        "Family history, exposure to certain chemicals, and previous chemotherapy can increase the risk.",
      treatment:
        "Chemotherapy, targeted therapy, and stem cell transplants are used for treatment.",
      prescription: {
        tablets: "Imatinib 100mg",
        bottles: "Vincristine Injection 1mg",
      },
    },
    {
      name: "Cystic Fibrosis",
      description:
        "Cystic fibrosis is a genetic disorder that affects the lungs and digestive system, causing thick, sticky mucus to build up and cause severe respiratory and digestive problems.",
      symptoms: [
        "Chronic cough",
        "Wheezing",
        "Shortness of breath",
        "Salty skin",
        "Frequent lung infections",
      ],
      causes:
        "Cystic fibrosis is caused by mutations in the CFTR gene, leading to dysfunctional chloride channels.",
      riskFactors:
        "Cystic fibrosis is inherited, meaning both parents must carry the defective gene.",
      treatment:
        "Chest physiotherapy, inhaled medications, and enzyme supplements to aid digestion.",
      prescription: {
        tablets: "Pancrelipase 500mg",
        bottles: "Albuterol Inhaler 90mcg/dose",
      },
    },
    {
      name: "Alzheimer’s Disease",
      description:
        "Alzheimer’s disease is a progressive neurodegenerative disorder that leads to memory loss, confusion, and changes in behavior.",
      symptoms: [
        "Memory loss",
        "Confusion",
        "Difficulty performing familiar tasks",
        "Personality changes",
        "Disorientation",
      ],
      causes:
        "Alzheimer’s disease is caused by the accumulation of amyloid plaques and tau tangles in the brain.",
      riskFactors:
        "Age, family history, and genetic mutations increase the risk of Alzheimer’s disease.",
      treatment:
        "There is no cure, but medications like cholinesterase inhibitors may help manage symptoms.",
      prescription: {
        tablets: "Donepezil 5mg",
        bottles: "Memantine 10mg",
      },
    },
    {
      name: "Multiple Sclerosis",
      description:
        "Multiple sclerosis is a chronic autoimmune disease that affects the central nervous system, leading to a variety of neurological symptoms.",
      symptoms: [
        "Fatigue",
        "Numbness or tingling",
        "Muscle weakness",
        "Vision problems",
        "Coordination problems",
      ],
      causes:
        "MS occurs when the immune system attacks the protective covering of nerve fibers, disrupting communication between the brain and the rest of the body.",
      riskFactors:
        "Age, gender (more common in women), and family history can increase the risk.",
      treatment:
        "Disease-modifying therapies (DMTs) and medications to manage symptoms.",
      prescription: {
        tablets: "Dimethyl fumarate 120mg",
        bottles: "Methylprednisolone Injection 100mg/2ml",
      },
    },
    {
      name: "Migraine",
      description:
        "Migraine is a neurological condition characterized by intense headaches, often accompanied by nausea, vomiting, and sensitivity to light and sound.",
      symptoms: [
        "Severe headache",
        "Nausea",
        "Vomiting",
        "Sensitivity to light and sound",
        "Aura (flashes of light or blind spots)",
      ],
      causes:
        "The exact cause is unknown, but genetics and environmental factors may play a role.",
      riskFactors:
        "Family history, stress, hormonal changes, and certain foods or drinks can trigger migraines.",
      treatment:
        "Pain relief medications, anti-nausea drugs, and preventive treatments.",
      prescription: {
        tablets: "Sumatriptan 50mg",
        bottles: "Ondansetron 4mg/2ml",
      },
    },
    {
      name: "Tuberculosis",
      description:
        "Tuberculosis (TB) is a bacterial infection that primarily affects the lungs, though it can impact other parts of the body.",
      symptoms: [
        "Cough (with blood)",
        "Weight loss",
        "Night sweats",
        "Fever",
        "Fatigue",
        "Chest pain",
      ],
      causes:
        "TB is caused by a bacterium called Mycobacterium tuberculosis, which spreads through the air.",
      riskFactors:
        "People with weakened immune systems, such as those with HIV, are at higher risk.",
      treatment:
        "TB is treated with a combination of antibiotics, such as Rifampin and Isoniazid.",
      prescription: {
        tablets: "Isoniazid 300mg",
        bottles: "Rifampin 10mg/ml",
      },
    },
    {
      name: "COVID-19",
      description:
        "COVID-19 is a viral infection caused by the SARS-CoV-2 virus, leading to respiratory issues and, in severe cases, organ failure.",
      symptoms: [
        "Fever",
        "Cough",
        "Shortness of breath",
        "Fatigue",
        "Loss of taste and smell",
        "Muscle pain",
      ],
      causes:
        "COVID-19 is caused by the SARS-CoV-2 virus, which spreads through respiratory droplets.",
      riskFactors:
        "Elderly individuals and people with pre-existing health conditions are at greater risk.",
      treatment:
        "Treatment includes antivirals, corticosteroids, and oxygen therapy in severe cases.",
      prescription: {
        tablets: "Remdesivir 100mg",
        bottles: "Dexamethasone 20mg/50ml",
      },
    },
    {
      name: "Diabetes",
      description:
        "Diabetes is a metabolic disorder where the body cannot properly process blood sugar (glucose), leading to high levels.",
      symptoms: [
        "Increased thirst",
        "Frequent urination",
        "Extreme hunger",
        "Fatigue",
        "Blurred vision",
        "Slow healing wounds",
      ],
      causes:
        "Diabetes is caused by either insufficient insulin production or the body’s inability to respond properly to insulin.",
      riskFactors:
        "Obesity, age over 45, and a family history of diabetes increase the risk.",
      treatment:
        "Insulin therapy and oral medications to control blood sugar levels.",
      prescription: {
        tablets: "Metformin 500mg",
        bottles: "Insulin Glargine 100 units/ml",
      },
    },
    {
      name: "HIV/AIDS",
      description:
        "HIV is a virus that attacks the immune system, and when left untreated, it can progress to AIDS, which severely weakens the immune system.",
      symptoms: [
        "Fever",
        "Chills",
        "Swollen lymph nodes",
        "Rash",
        "Night sweats",
        "Rapid weight loss",
      ],
      causes:
        "HIV spreads through contact with infected bodily fluids, such as blood or semen.",
      riskFactors:
        "Unprotected sex, sharing needles, and blood transfusions can increase the risk.",
      treatment:
        "Antiretroviral therapy (ART) is used to manage HIV and prevent it from progressing to AIDS.",
      prescription: {
        tablets: "Tenofovir 300mg",
        bottles: "Emtricitabine 200mg",
      },
    },
    {
      name: "Asthma",
      description:
        "Asthma is a chronic condition that causes inflammation and narrowing of the airways, leading to difficulty breathing.",
      symptoms: [
        "Wheezing",
        "Coughing",
        "Shortness of breath",
        "Chest tightness",
        "Increased mucus production",
      ],
      causes:
        "Asthma can be triggered by allergens, respiratory infections, or physical activity.",
      riskFactors:
        "Family history of asthma, exposure to allergens, and smoking can increase the risk.",
      treatment:
        "Bronchodilators and corticosteroids to open the airways and reduce inflammation.",
      prescription: {
        tablets: "Montelukast 10mg",
        bottles: "Salbutamol Inhaler 100mcg/dose",
      },
    },
    {
      name: "Cancer",
      description:
        "Cancer is a group of diseases characterized by abnormal cell growth that can spread to other parts of the body.",
      symptoms: [
        "Unexplained weight loss",
        "Fatigue",
        "Pain",
        "Skin changes",
        "Unusual bleeding",
        "Persistent cough",
      ],
      causes:
        "Cancer is caused by genetic mutations that lead to uncontrolled cell division.",
      riskFactors:
        "Tobacco use, excessive alcohol, family history, and exposure to certain chemicals increase the risk.",
      treatment:
        "Chemotherapy, radiation therapy, and surgery are common treatments.",
      prescription: {
        tablets: "Tamoxifen 10mg",
        bottles: "Doxorubicin Injection 50mg/25ml",
      },
    },
    {
      name: "Hypertension",
      description:
        "Hypertension (high blood pressure) is a common condition where the force of the blood against the artery walls is consistently too high.",
      symptoms: [
        "Headache",
        "Shortness of breath",
        "Nosebleeds",
        "Fatigue",
        "Dizziness",
      ],
      causes:
        "Causes of hypertension can include obesity, lack of physical activity, and poor diet.",
      riskFactors:
        "Family history, smoking, excessive alcohol use, and high salt intake increase the risk.",
      treatment:
        "Antihypertensive drugs like ACE inhibitors, calcium channel blockers, and diuretics.",
      prescription: {
        tablets: "Amlodipine 5mg",
        bottles: "Lisinopril 10mg",
      },
    },
    {
      name: "Pneumonia",
      description:
        "Pneumonia is an infection of the lungs that can be caused by bacteria, viruses, or fungi, leading to inflammation in the lungs.",
      symptoms: [
        "Cough",
        "Shortness of breath",
        "Chest pain",
        "Fever",
        "Fatigue",
        "Nausea and vomiting",
      ],
      causes:
        "Pneumonia is often caused by bacteria such as Streptococcus pneumoniae or viruses like influenza.",
      riskFactors:
        "Elderly individuals, smokers, and people with compromised immune systems are at higher risk.",
      treatment:
        "Antibiotics for bacterial pneumonia, antivirals for viral pneumonia.",
      prescription: {
        tablets: "Amoxicillin 500mg",
        bottles: "Azithromycin 250mg",
      },
    },
    {
      name: "Influenza",
      description:
        "Influenza (flu) is a viral infection that attacks the respiratory system, causing fever, cough, and body aches.",
      symptoms: [
        "Fever",
        "Cough",
        "Sore throat",
        "Body aches",
        "Fatigue",
        "Headache",
      ],
      causes:
        "Influenza is caused by the influenza virus, which spreads through respiratory droplets.",
      riskFactors:
        "Elderly, young children, pregnant women, and people with weak immune systems are at higher risk.",
      treatment: "Antiviral medications, rest, and fluids.",
      prescription: {
        tablets: "Oseltamivir 75mg",
        bottles: "Zanamivir Inhaler 5mg/dose",
      },
    },
    {
      name: "Common Cold",
      description: "A viral infection affecting the nose and throat.",
      symptoms: ["Runny nose", "Sneezing", "Sore throat", "Cough"],
      causes: "Caused by various viruses, most commonly rhinoviruses.",
      riskFactors:
        "Close contact with infected people, colder weather, low immunity.",
      treatment: "Rest, hydration, and over-the-counter cold remedies.",
      prescription: {
        tablets: "Paracetamol 500mg",
        syrups: "Cough syrup as needed",
      },
    },
    {
      name: "Headache",
      description: "Pain in any region of the head.",
      symptoms: [
        "Throbbing or dull pain",
        "Sensitivity to light",
        "Nausea (in migraines)",
      ],
      causes: "Stress, dehydration, eye strain, migraines.",
      riskFactors: "Stress, lack of sleep, diet, dehydration.",
      treatment: "Pain relievers, hydration, rest.",
      prescription: {
        tablets: "Ibuprofen 200mg",
        syrups: "Acetaminophen 5ml",
      },
    },
    {
      name: "Allergic Rhinitis (Hay Fever)",
      description:
        "An allergic reaction causing sneezing and other similar symptoms.",
      symptoms: ["Sneezing", "Runny nose", "Itchy eyes", "Coughing"],
      causes: "Allergens such as pollen, dust, animal dander.",
      riskFactors: "Allergies, family history, certain seasons.",
      treatment: "Antihistamines, nasal sprays, avoiding allergens.",
      prescription: {
        tablets: "Cetirizine 10mg",
        sprays: "Fluticasone nasal spray",
      },
    },
    {
      name: "Gastroenteritis (Stomach Flu)",
      description:
        "Infection of the stomach and intestines causing nausea and diarrhea.",
      symptoms: ["Nausea", "Vomiting", "Diarrhea", "Stomach cramps"],
      causes: "Viral or bacterial infection, contaminated food or water.",
      riskFactors: "Poor hygiene, close contact with infected people.",
      treatment: "Hydration, electrolyte replacement, rest.",
      prescription: {
        tablets: "Ondansetron 4mg",
        liquids: "Oral rehydration solution",
      },
    },
    {
      name: "Urinary Tract Infection (UTI)",
      description: "Infection in any part of the urinary system.",
      symptoms: ["Frequent urination", "Burning sensation", "Cloudy urine"],
      causes: "Bacterial infection, usually E. coli.",
      riskFactors: "Female gender, sexual activity, poor hygiene.",
      treatment: "Antibiotics, increased water intake.",
      prescription: {
        tablets: "Nitrofurantoin 100mg",
        liquids: "Cranberry juice (supportive)",
      },
    },
    {
      name: "Acne",
      description: "Skin condition causing pimples and blackheads.",
      symptoms: ["Pimples", "Whiteheads", "Blackheads", "Redness"],
      causes: "Hormonal changes, bacteria, excess oil production.",
      riskFactors: "Teenage years, hormonal changes, genetics.",
      treatment: "Topical creams, antibiotics (for severe cases).",
      prescription: {
        creams: "Benzoyl peroxide 5%",
        tablets: "Doxycycline 100mg (if needed)",
      },
    },
    {
      name: "Sinusitis",
      description: "Inflammation of the sinuses often causing facial pain.",
      symptoms: [
        "Nasal congestion",
        "Facial pain",
        "Headache",
        "Mucus discharge",
      ],
      causes: "Bacterial or viral infection, allergies.",
      riskFactors: "Allergies, respiratory infections, nasal polyps.",
      treatment: "Decongestants, pain relievers, saline nasal sprays.",
      prescription: {
        tablets: "Amoxicillin 500mg (for bacterial infection)",
        sprays: "Saline nasal spray",
      },
    },
    {
      name: "Sore Throat (Pharyngitis)",
      description: "Pain or irritation in the throat.",
      symptoms: ["Painful swallowing", "Red throat", "Swollen glands"],
      causes: "Viral or bacterial infection, dryness.",
      riskFactors: "Close contact with sick individuals, cold weather.",
      treatment: "Warm fluids, lozenges, pain relievers.",
      prescription: {
        tablets: "Ibuprofen 200mg",
        syrups: "Cough syrup as needed",
      },
    },
    {
      name: "Seasonal Flu",
      description: "Viral infection affecting the respiratory system.",
      symptoms: ["Fever", "Body aches", "Chills", "Fatigue"],
      causes: "Influenza virus.",
      riskFactors: "Close contact with infected people, weak immunity.",
      treatment: "Rest, hydration, antiviral medications if severe.",
      prescription: {
        tablets: "Oseltamivir 75mg (if prescribed)",
        syrups: "Cough syrup as needed",
      },
    },
    {
      name: "Constipation",
      description: "Difficulty in passing stool.",
      symptoms: ["Hard stools", "Infrequent bowel movements", "Bloating"],
      causes: "Low fiber diet, dehydration, inactivity.",
      riskFactors: "Low fiber intake, sedentary lifestyle.",
      treatment: "High-fiber diet, hydration, stool softeners.",
      prescription: {
        tablets: "Bisacodyl 5mg",
        powders: "Psyllium fiber supplement",
      },
    },
    {
      name: "Diarrhea",
      description: "Frequent loose or watery bowel movements.",
      symptoms: ["Frequent loose stools", "Abdominal cramps", "Dehydration"],
      causes: "Infection, food poisoning, certain medications.",
      riskFactors: "Poor hygiene, contaminated food.",
      treatment: "Hydration, electrolyte replacement, bland diet.",
      prescription: {
        tablets: "Loperamide 2mg",
        liquids: "Oral rehydration solution",
      },
    },
    {
      name: "Heartburn (Acid Reflux)",
      description: "A burning sensation in the chest caused by acid reflux.",
      symptoms: ["Burning in chest", "Acid taste", "Belching"],
      causes: "Stomach acid flows back into the esophagus.",
      riskFactors: "Obesity, spicy foods, pregnancy.",
      treatment: "Antacids, lifestyle changes, acid reducers.",
      prescription: {
        tablets: "Omeprazole 20mg",
        syrups: "Antacid syrup as needed",
      },
    },
    {
      name: "Cough",
      description: "A reflex to clear the airways of mucus or irritants.",
      symptoms: ["Dry or productive cough", "Throat irritation"],
      causes: "Infection, allergies, irritants.",
      riskFactors: "Respiratory infections, smoking, allergies.",
      treatment: "Cough suppressants, hydration, lozenges.",
      prescription: {
        tablets: "Dextromethorphan 10mg",
        syrups: "Cough syrup as needed",
      },
    },
    {
      name: "Skin Rash",
      description: "Red, itchy, or swollen skin.",
      symptoms: ["Redness", "Itching", "Swelling", "Bumps"],
      causes: "Allergies, infections, irritants.",
      riskFactors: "Allergies, sensitive skin.",
      treatment: "Antihistamines, topical creams, avoiding irritants.",
      prescription: {
        creams: "Hydrocortisone cream 1%",
        tablets: "Cetirizine 10mg",
      },
    },
    {
      name: "Back Pain",
      description: "Pain or discomfort in the lower back area.",
      symptoms: ["Aching", "Stiffness", "Limited mobility"],
      causes: "Muscle strain, poor posture, injury.",
      riskFactors: "Obesity, sedentary lifestyle, lifting heavy objects.",
      treatment: "Rest, pain relievers, physical therapy.",
      prescription: {
        tablets: "Ibuprofen 200mg",
        creams: "Topical analgesic cream",
      },
    },
    {
      name: "Ear Infection",
      description: "Infection in the middle ear.",
      symptoms: ["Ear pain", "Fever", "Drainage"],
      causes: "Bacterial or viral infection.",
      riskFactors: "Young age, allergies, recent cold.",
      treatment: "Antibiotics (if bacterial), pain relievers.",
      prescription: {
        tablets: "Amoxicillin 500mg (if prescribed)",
        drops: "Ear drops as needed",
      },
    },
    {
      name: "Athlete’s Foot",
      description: "Fungal infection between the toes.",
      symptoms: ["Itching", "Cracking", "Blisters"],
      causes: "Fungal growth, usually due to moisture.",
      riskFactors: "Sweaty feet, tight shoes, public showers.",
      treatment: "Antifungal creams, keeping feet dry.",
      prescription: {
        creams: "Clotrimazole cream",
        powders: "Antifungal powder as needed",
      },
    },
    {
      name: "Nausea",
      description: "Feeling of unease in the stomach with urge to vomit.",
      symptoms: ["Queasiness", "Vomiting"],
      causes: "Motion sickness, infection, medications.",
      riskFactors: "Travel, certain medications.",
      treatment: "Ginger tea, hydration, anti-nausea medications.",
      prescription: {
        tablets: "Ondansetron 4mg",
        syrups: "Anti-nausea syrup",
      },
    },
    {
      name: "Sore Muscles",
      description: "Muscle pain after exertion.",
      symptoms: ["Pain", "Stiffness", "Swelling"],
      causes: "Exercise, overuse, muscle strain.",
      riskFactors: "Physical activity, poor warm-up.",
      treatment: "Rest, ice, gentle stretching.",
      prescription: {
        tablets: "Ibuprofen 200mg",
        creams: "Muscle pain relief cream",
      },
    },
    {
      name: "Toothache",
      description: "Pain in or around a tooth.",
      symptoms: ["Throbbing pain", "Sensitivity to hot or cold", "Swelling"],
      causes: "Tooth decay, gum infection, dental injury.",
      riskFactors: "Poor dental hygiene, sugary foods.",
      treatment: "Pain relievers, dentist visit for treatment.",
      prescription: {
        tablets: "Ibuprofen 200mg",
        mouthwashes: "Antiseptic mouthwash",
      },
    },
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setDisease(value);

    // Filter suggestions based on input
    if (value) {
      const filteredSuggestions = diseasesData
        .filter((d) => d.name.toLowerCase().includes(value.toLowerCase()))
        .map((d) => d.name);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setDisease(suggestion);
    setSuggestions([]);
  };

  const handleSearch = () => {
    if (!disease) return;

    setLoading(true);
    setError("");
    setData(null);

    const foundDisease = diseasesData.find(
      (d) => d.name.toLowerCase() === disease.toLowerCase()
    );

    setTimeout(() => {
      if (foundDisease) {
        setData(foundDisease);
      } else {
        setError("Disease not found");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <hr />
      <div className="min-h-screen bg-gray-50 mt-2 flex flex-col justify-center items-center py-10 px-4">
        <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-6 lg:p-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-600 mb-6 sm:mb-8">
            Disease Information Finder
          </h1>

          {/* Disease Search Input */}
          <input
            type="text"
            className="w-full p-4 mb-2 border border-gray-300 rounded-md text-lg"
            placeholder="Enter disease name (e.g., Malaria, Tuberculosis)"
            value={disease}
            onChange={handleInputChange}
          />

          {/* Dropdown List for Suggestions */}
          {suggestions.length > 0 && (
            <ul className="w-full border border-gray-300 rounded-md bg-white shadow-md max-h-40 overflow-y-auto mb-4">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}

          {/* Search Button */}
          <button
            className="w-full py-3 bg-blue-600 text-white text-xl rounded-md hover:bg-blue-700 transition duration-300"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>

          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

          {data && (
            <div className="mt-6 space-y-6 sm:mt-8">
              <div className="text-center p-4 border-b-2 border-blue-600">
                <h2 className="text-2xl sm:text-3xl font-semibold">
                  {data.name}
                </h2>
              </div>

              {/* Description */}
              <div className="p-4 sm:p-6 border rounded-lg shadow-md bg-gray-50">
                <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4">
                  Description
                </h3>
                <p className="text-base sm:text-lg text-gray-700">
                  {data.description}
                </p>
              </div>

              {/* Symptoms and Prescription */}
              <div className="flex flex-col sm:flex-row sm:justify-between p-4 sm:p-6 border rounded-lg shadow-md bg-gray-50">
                {/* Symptoms */}
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4">
                    Symptoms
                  </h3>
                  <ul className="space-y-2">
                    {data.symptoms.map((symptom, index) => (
                      <li
                        key={index}
                        className="text-base sm:text-lg text-gray-700"
                      >
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prescription */}
                <div className="w-full sm:w-1/2">
                  <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4">
                    Prescription
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700">
                    {data.prescription.tablets && (
                      <span>Tablets: {data.prescription.tablets}</span>
                    )}
                    {data.prescription.syrups && (
                      <span className="block">
                        Syrups: {data.prescription.syrups}
                      </span>
                    )}
                    {data.prescription.creams && (
                      <span className="block">
                        Creams: {data.prescription.creams}
                      </span>
                    )}
                    {data.prescription.ointments && (
                      <span className="block">
                        Ointments: {data.prescription.ointments}
                      </span>
                    )}
                    {data.prescription.drops && (
                      <span className="block">
                        Drops: {data.prescription.drops}
                      </span>
                    )}
                    {data.prescription.gels && (
                      <span className="block">
                        Gels: {data.prescription.gels}
                      </span>
                    )}
                    {data.prescription.lotions && (
                      <span className="block">
                        Lotions: {data.prescription.lotions}
                      </span>
                    )}
                    {data.prescription.powders && (
                      <span className="block">
                        Powders: {data.prescription.powders}
                      </span>
                    )}
                    {data.prescription.teas && (
                      <span className="block">
                        Teas: {data.prescription.teas}
                      </span>
                    )}
                    {data.prescription.gums && (
                      <span className="block">
                        Gums: {data.prescription.gums}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Causes and Risk Factors */}
              <div className="flex flex-col sm:flex-row sm:justify-between p-4 sm:p-6 border rounded-lg shadow-md bg-gray-50">
                {/* Causes */}
                <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                  <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4">
                    Causes
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700">
                    {data.causes}
                  </p>
                </div>

                {/* Risk Factors */}
                <div className="w-full sm:w-1/2">
                  <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4">
                    Risk Factors
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700">
                    {data.riskFactors}
                  </p>
                </div>
              </div>

              {/* Treatment */}
              <div className="text-center p-4 sm:p-6 border rounded-lg shadow-md bg-gray-50">
                <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4">
                  Treatment
                </h3>
                <p className="text-base sm:text-lg text-gray-700">
                  {data.treatment}
                </p>
              </div>
            </div>
          )}

          {/* Warning Section */}
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-yellow-200 border border-yellow-500 rounded-lg shadow-md">
            <h4 className="text-lg sm:text-xl font-semibold text-yellow-800">
              Warning
            </h4>
            <p className="text-base sm:text-lg text-yellow-700">
              The information provided here is for educational purposes only.
              Always consult a medical professional for diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiseaseInfo;
