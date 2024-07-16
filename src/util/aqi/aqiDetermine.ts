export const determineCOPollutionLevel = (coValue: number) => {
  if (coValue < 0) {
    return undefined;
  }
  else if (coValue < 5) {
    return 0;
  }
  else if (coValue < 10) {
    return 1;
  }
  else if (coValue < 35) {
    return 2;
  }
  else if (coValue < 60) {
    return 3;
  }
  else if (coValue < 90) {
    return 4;
  }
  else if (coValue < 120) {
    return 5;
  }
  else if (coValue < 150) {
    return 6;
  }
  else {
    return 7;
  }
}

export const determineSO2PollutionLevel = (so2Value: number) => {
  if (so2Value < 0) {
    return undefined;
  }
  else if (so2Value < 150) {
    return 0;
  }
  else if (so2Value < 500) {
    return 1;
  }
  else if (so2Value < 650) {
    return 2;
  }
  else if (so2Value < 800) {
    return 3;
  }
  else {
    return 4;
  }
}

export const determineSPMPollutionLevel = (spmValue: number) => {
  if (spmValue < 0) {
    return undefined;
  }
  else if (spmValue < 35) {
    return 0;
  }
  else if (spmValue < 75) {
    return 1;
  }
  else if (spmValue < 115) {
    return 2;
  }
  else if (spmValue < 150) {
    return 3;
  }
  else if (spmValue < 250) {
    return 4;
  }
  else if (spmValue < 350) {
    return 5;
  }
  else if (spmValue < 500) {
    return 6;
  }
  else {
    return 7;
  }
}