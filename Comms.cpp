#include "Comms.h"
#include <SPI.h>

const int DAC_CS = 10;
const int incPin = 3;
const int flopClock = 4;

void setupPins() {
  pinMode(DAC_CS, OUTPUT);
  pinMode(incPin, OUTPUT);
  pinMode(flopClock, OUTPUT);

  digitalWrite(DAC_CS, HIGH);
  digitalWrite(incPin, LOW);
  digitalWrite(flopClock, LOW);
}

void applyTrainingVoltage(uint16_t v_free, uint16_t v_clamp) {
  setDACVoltage(0, v_free);
  setDACVoltage(1, v_clamp);
  delayMicroseconds(10);
}

void pulseTrainingLogic() {
  pulsePin(flopClock, 5);
  delayMicroseconds(5);
  pulsePin(incPin, 5);
  delay(100);
}

void pulsePin(int pin, int durationMicrosec) {
  digitalWrite(pin, HIGH);
  delayMicroseconds(durationMicrosec);
  digitalWrite(pin, LOW);
}

void setDACVoltage(uint8_t channel, uint16_t value) {
  uint8_t control_bits = (channel & 0x03) << 6;
  uint16_t command = (control_bits << 8) | (value & 0x0FFF);

  digitalWrite(DAC_CS, LOW);
  SPI.transfer16(command);
  digitalWrite(DAC_CS, HIGH);
}

void applyInferenceVoltage(uint16_t v_free) {
  setDACVoltage(0, v_free);
  delayMicroseconds(10);
}

float measureOutput() {
  int raw = analogRead(A0);
  return (raw / 1023.0) * 5.0;
}