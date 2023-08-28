import { AVAILABLE_LANGUAGE_LIST, CLASSLEVEL_LIST, PERSONALITY_LIST } from './constant';

export const personalityTranslation = (personalityArray: string[]) => {
  const translated = personalityArray.map((personality) => {
    const fullPersonality = PERSONALITY_LIST.find((element) => {
      return element.value === personality;
    });
    return fullPersonality?.text;
  });
  return translated;
};

export const classLevelTranslation = (classLevelArray: string[]) => {
  const translated = classLevelArray.map((classLevel) => {
    const fullClassLevel = CLASSLEVEL_LIST.find((element) => {
      return element.value === classLevel;
    });
    return fullClassLevel?.text;
  });
  return translated;
};

export const speakingLanguageTranslation = (speakingLanguageArray: string[]) => {
  const translated = speakingLanguageArray.map((speakingLanguage) => {
    const fullSpeakingLanguage = AVAILABLE_LANGUAGE_LIST.find((element) => {
      return element.value === speakingLanguage;
    });
    return fullSpeakingLanguage?.text;
  });
  return translated;
};
// export const classLevelTranslation = (classLevelArray) => {}
// export const speakingLanguageTranslation = (speakingLanguageArray) => {}
