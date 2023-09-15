import { AVAILABLE_LANGUAGE_LIST, CLASSLEVEL_LIST, PERSONALITY_LIST } from '../../constants/signup.constant';

export const personalityTranslation = (personalityArray: string[]) => {
  const translated: string[] = [];
  personalityArray.forEach((personality) => {
    const fullPersonality = PERSONALITY_LIST.find((element) => {
      return element.value === personality;
    });
    if (fullPersonality) translated.push(fullPersonality.text);
  });
  return translated;
};

export const personalityEngTranslation = (personalityArray: string[]) => {
  const translated: string[] = [];
  personalityArray.forEach((personality) => {
    const fullPersonality = PERSONALITY_LIST.find((element) => {
      return element.text === personality;
    });
    if (fullPersonality) translated.push(fullPersonality.value);
  });
  return translated;
};

export const classLevelTranslation = (classLevelArray: string[]) => {
  const translated: string[] = [];
  classLevelArray.forEach((classLevel) => {
    const fullClassLevel = CLASSLEVEL_LIST.find((element) => {
      return element.value === classLevel;
    });
    if (fullClassLevel) translated.push(fullClassLevel.text);
  });
  return translated;
};
export const classLevelEngTranslation = (classLevelArray: string[]) => {
  const translated: string[] = [];
  classLevelArray.forEach((classLevel) => {
    const fullClassLevel = CLASSLEVEL_LIST.find((element) => {
      return element.text === classLevel;
    });
    if (fullClassLevel) translated.push(fullClassLevel.value);
  });
  return translated;
};

export const speakingLanguageTranslation = (speakingLanguageArray: string[]) => {
  const translated: string[] = [];
  speakingLanguageArray.forEach((speakingLanguage) => {
    const fullSpeakingLanguage = AVAILABLE_LANGUAGE_LIST.find((element) => {
      return element.value === speakingLanguage;
    });
    if (fullSpeakingLanguage) translated.push(fullSpeakingLanguage.text);
  });

  return translated;
};

export const speakingLanguageEngTranslation = (speakingLanguageArray: string[]) => {
  const translated: string[] = [];
  speakingLanguageArray.forEach((speakingLanguage) => {
    const fullSpeakingLanguage = AVAILABLE_LANGUAGE_LIST.find((element) => {
      return element.text === speakingLanguage;
    });
    if (fullSpeakingLanguage) translated.push(fullSpeakingLanguage.value);
  });

  return translated;
};
