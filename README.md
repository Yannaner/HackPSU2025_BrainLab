# BrainLabs: Decentralized Machine Learning on Physical Circuit

![BrainLabs Circuit](https://github.com/user-attachments/assets/ccba09e7-4662-468a-9273-e45ab17cad0b)

## Tech Stack & Tools
[![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)](https://www.python.org)
[![Flask](https://img.shields.io/badge/Flask-000000?logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=Vite&logoColor=white)](https://vitejs.dev/)
[![Arduino](https://img.shields.io/badge/Arduino-00979D?logo=arduino&logoColor=white)](https://www.arduino.cc/)
[![PySerial](https://img.shields.io/badge/PySerial-3776AB?logo=python&logoColor=white)](https://github.com/pyserial/pyserial)
[![ngrok](https://img.shields.io/badge/ngrok-1F1E37?logo=ngrok&logoColor=white)](https://ngrok.com/)
[![Firebase](https://img.shields.io/badge/Firebase-039BE5?logo=firebase&logoColor=white)](https://firebase.google.com)

---

## Inspiration 🧠

Inspired by recent advances in **decentralized physics-driven learning** and biological neural systems, BrainLabs rethinks machine learning at its core. Instead of relying on massive GPU clusters or von Neumann architectures, we designed a system where **computation and learning are performed directly on a physical circuit**, akin to how the brain's synapses adapt using only local information.

We took inspiration from [Dillavou et al., 2022] and the **contrastive coupled learning** framework, which showed that networks can self-organize by simply comparing free and clamped states—no global processor, no memory overhead, no backpropagation.

---

## What It Does ⚡

BrainLabs is a fully functional **physical learning system**:
- A resistor network acts as the equivalent of a neural network.
- Learning happens by adjusting resistance values via digital potentiometers.
- Comparators and XOR gates implement a decentralized version of contrastive learning.
- All updates are local — each “edge” (connection) only looks at its own state.
- The learning rule mimics **energy minimization** seen in biological and mechanical systems.

In short, BrainLabs is an electronic material that learns by adjusting itself, directly and physically.

To make it accessible, we've built a modern, cloud-enabled interface where users can upload datasets, watch the system train in real time, and interact directly with the hardware over the web.

---

## How We Built It 🛠️

![BrainLabs Circuitry](https://github.com/user-attachments/assets/09cadc13-7671-4554-a535-aacfade72056)

The heart of BrainLabs is a **twin-network architecture**: one network for the free state, and another for the clamped state. This implementation allows us to apply contrastive learning in real physical systems by comparing how the circuit behaves under two boundary conditions.

Each edge contains:
- A pair of digital potentiometers (for the free and clamped states)
- Comparators
- XOR gates
- A D-flip flop for stable state transitions

All updates happen without centralized control, driven by a simple global clock.

The system is orchestrated by:
- **Arduino** for interfacing and control
- **PySerial** for low-level communication
- **Flask** and **Vite** for a clean frontend/backend separation
- **Ngrok** for remote accessibility
- **Firebase** (optional) for user authentication and experiment logging

---

## Challenges We Encountered ⚙️
![image](https://github.com/user-attachments/assets/3425e5a0-ac50-41dc-a37a-6196f42c00dd)

Precision is paramount in analog learning. Even small voltage fluctuations introduced noise that could destabilize training. Implementing the **discrete contrastive learning rule** using real-world comparators and XOR logic required careful handling to ensure the system remained responsive without becoming unstable.

Another challenge was ensuring real-time synchronization between the hardware and the frontend without introducing noticeable latency — something we solved through lightweight protocols and smart clocking.

---

## Achievements We’re Proud Of 🥇

- We successfully realized a **fully decentralized, physics-driven learning system**.
- Achieved functional training using only **local voltage-based updates**, with no global cost function.
- Built a web interface that allows non-experts to upload datasets, configure experiments, and visualize learning outcomes.
- Demonstrated that the system is **robust to edge failures**, showing graceful degradation, not catastrophic collapse — an attribute inherited directly from the biological and mechanical learning systems we were inspired by.

---

## Insights 💡

The project reaffirmed the power of **contrastive coupled learning** (Stern et al.) in real circuits. Local update rules, when physically realized, can induce global learning behavior that is resilient, scalable, and interpretable.

We also observed that analog systems are naturally suited for **energy minimization**, suggesting that physical AI could be a natural fit for future edge devices and embedded intelligence, especially when energy efficiency is crucial.

---

## What’s Next 🚀

We're currently working towards:
- **Fabrication of custom ICs** to scale the network beyond breadboards.
- Extending BrainLabs to **perform classification, regression, and allosteric tasks** as shown in the research literature.
- Exploring desynchronous learning, non-equilibrium propagation, and other biologically-inspired rules, building directly on the latest advances in **physics-based learning machines**.

We envision BrainLabs as the foundation for **next-generation neuromorphic hardware** that is scalable, sustainable, and elegantly simple.

---

**Interested? Curious?**  
Check out our full repository, circuit diagrams, and source code to start experimenting with **real, physical machine learning**.
