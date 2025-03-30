#include <SPI.h>
#include "Comms.h"

void setup() {
  Serial.begin(9600);
  SPI.begin();

  setupPins();
}

void loop() {
  if (Serial.available()) {
    String input = Serial.readStringUntil('\n');
    Serial.print("Received: ");
    Serial.println(input);  

    // Inference mode
    if (input.startsWith("i")) {
      int val = input.substring(1).toInt();
      Serial.print("Applying inference DAC value: ");
      Serial.println(val);  

      applyInferenceVoltage(val);

      float v = measureOutput();
      Serial.println(v, 3);  
      return;
    }

    // Training mode
    int commaIndex = input.indexOf(',');
    if (commaIndex > 0) {
      int v1 = input.substring(0, commaIndex).toInt();
      int v2 = input.substring(commaIndex + 1).toInt();

      Serial.print("Training pair: ");
      Serial.print(v1);
      Serial.print(", ");
      Serial.println(v2); =

      applyTrainingVoltage(v1, v2);
      pulseTrainingLogic();
    }
  }
} 