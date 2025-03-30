#ifndef COMMS_H
#define COMMS_H

#include <Arduino.h>

void setupPins();
void applyTrainingVoltage(uint16_t v_free, uint16_t v_clamp);
void pulseTrainingLogic();
void pulsePin(int pin, int durationMicrosec);
void setDACVoltage(uint8_t channel, uint16_t value);
void applyInferenceVoltage(uint16_t v_free);
float measureOutput();

#endif