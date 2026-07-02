// OnboardingScreen.tsx
import AppButton from '@components/Common/AppButton';
import { AppCheckbox } from '@components/Common/AppCheckbox';
import { ONBOARDING_STEPS } from '@utils/onboardingSteps';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { Images } from 'src/assets/images';
import { RootStackParamList } from 'src/interface/Navigation/navigation.interface';
import { styles } from 'src/styles/onboarding.styles';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NAVIGATION } from "src/constants/Navigation/navigation.constant";
import { useNavigation } from "@react-navigation/native";


const OnboardingScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const current = ONBOARDING_STEPS[step];

  useEffect(() => {
    if (!answers[step]) {
      const defaultOption =
        current.options[current.defaultIndex];
      setAnswers(prev => ({
        ...prev,
        [step]: defaultOption,
      }));
    }
  }, [step]);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ position: "absolute", width: "100%", height: "100%" }}
        source={Images.SPLASH_BACKGROUND}
      />
      {/* Progress Bar */}
      <View style={styles.progressBg}>
        <View
          style={[
            styles.progressFill,
            { width: `${((step + 1) / ONBOARDING_STEPS.length) * 100}%` },
          ]}
        />
      </View>


      <Text style={styles.question}>{current?.question}</Text>
      {
        current?.options?.map((option) => {
          return (
            <AppCheckbox
              key={option}
              label={option}
              selected={answers[step] === option}
              onPress={() =>
                setAnswers(prev => ({ ...prev, [step]: option }))
              }
            />
          )
        })
      }

      <AppButton
        title="Next"
        textStyle={styles.loginTextButton}
        onPress={() => step < 4 && setStep(step + 1)}
        style={styles.loginButton}
        iconLibrary="Ionicons"
        iconName="arrow-forward"
        iconPosition="right"
      />

      <Text
        onPress={() => {
          navigation.navigate(NAVIGATION.MAIN_TABS);
           //navigation.navigate(NAVIGATION.WELCOME_SCREEN)
        }}
        //onPress={() => setStep(step + 1)}
        style={[styles.question, { marginTop: 10 }]}>Skip</Text>
    </View>
  );
};

export default OnboardingScreen;
