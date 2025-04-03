# Brain Labs: Cloud-Enabled Physical Learning 

![BrainLabs Circuit](https://github.com/user-attachments/assets/ccba09e7-4662-468a-9273-e45ab17cad0b)

## Tech Stack & Tools
[![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)](https://www.python.org)
[![Flask](https://img.shields.io/badge/Flask-000000?logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=Vite&logoColor=white)](https://vitejs.dev/)
[![Arduino](https://img.shields.io/badge/Arduino-00979D?logo=arduino&logoColor=white)](https://www.arduino.cc/)
[![PySerial](https://img.shields.io/badge/PySerial-3776AB?logo=python&logoColor=white)](https://github.com/pyserial/pyserial)
[![ngrok](https://img.shields.io/badge/ngrok-1F1E37?logo=ngrok&logoColor=white)](https://ngrok.com/)
[![Firebase](https://img.shields.io/badge/Firebase-039BE5?logo=firebase&logoColor=white)](https://firebase.google.com)
[![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)


---

## Inspiration 🧠

As student researchers, we're inspired by recent advances in *decentralized physics-driven learning* research. We believe systems that can carry out *computations and learning directly on a physical circuit*  instead of relying on massive GPU clusters holds the key to a sustainable AI future and therefore wanted to be the first ones to democratize this technology to anyone interested through a cloud platform. 

We took inspiration from the work of Dillavou et al. (*Demonstration of Decentralized Physics-Driven Learning*, Phys. Rev. Applied, 2022), which showed the possibility of *in-situ* physical-learning with coupled learning.

---

## What It Does ⚡

Brain Labs is a fully-functional **physical learning system** connected to a **cloud platform**: 
- A physical, self-adjusting resistor network acts as the equivalent of a neural network
- Learning happens locally by adjusting resistance values via digital potentiometers
- A **user-friendly cloud platform** that allows users to upload datasets, train models, and conduct inference on our physical learning network based on their data, similar to a GPU cloud

---

## How We Built It 🛠️

![BrainLabs Circuitry](https://github.com/user-attachments/assets/09cadc13-7671-4554-a535-aacfade72056)

Brain Labs uses a **twin-edge network**: one network for the free state, and another for the clamped state. This implementation allows us to apply contrastive learning in real physical systems by comparing how the circuit behaves under two boundary conditions. 

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

One challenge that we encountered was that we had to work with inconsistent equipments. Since we had a limited supplies of comparators and had to build a network with four resistor edges, each of which uses a comparator, we had to compensate by using different types of comparators with different pinout diagrams. This made it difficult to test for errors, especially when working with a fully-integrated network.

Additionally, we had to compensate for a broken Arduino DUE, which we originally wanted to use for its onboard Digital to Analog convertors (DACs), by building out additional DAC circuits.

---

## Achievements We’re Proud Of 🥇

- We are the first people to implement a fully decentralized, physics driven learning network on a cloud platform that allows anyone from anywhere to use
- We built a physical learning network of four self-adjusting resistor edges that is able to learn without a processor
- We built a web interface that allows non-experts to upload datasets, configure experiments, and visualize learning outcomes. 

---

## Insights 💡

The project reaffirmed the potential of **physical learning networks** to be a viable and scalable solution to the growing demands of artificial intelligence. 

---

## What’s Next 🚀

We're currently working towards:
- Extending Brain Labs to perform more complex machine learning tasks such as multi-class classification and regression.
- Shifting Brain Labs from breadboard implementation to custom PCB and ultimately IC implementation for increased scalability. 

We envision BrainLabs as the foundation for **next-generation neuromorphic hardware** that is scalable, sustainable, and elegantly simple.

---

**Interested? Curious?**  
Check out our full repository, circuit diagrams, and source code to start experimenting with **real, physical machine learning**.
##Testing for fun a