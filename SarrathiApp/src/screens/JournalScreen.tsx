import { Text, View } from "react-native"
import { styles } from "src/styles/journal.styles"

const JournalScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Journal 📕</Text>
            <Text>Express your thoughts freely</Text>

            <View style={styles.boxContainer}>
                <Text style={styles.promptText}>😎 Today's Prompt</Text>
                <Text style={{textAlign:'justify'}}>What is one thing you're looking forward to this week?</Text>
            </View>

              <View style={styles.boxContainer}>
                <Text style={styles.promptText}>😍 Morning Gratitude</Text>
                <Text style={{textAlign:'justify',letterSpacing:1,lineHeight:20}}>Today I'm grateful for the warm sunshine and the peaceful walk I had this morning. I noticed the birds singing and it made me smile.</Text>
            </View>

             <View style={styles.boxContainer}>
                <Text style={styles.promptText}>📈 Reflection on Growth</Text>
                <Text style={{textAlign:'justify',letterSpacing:1,lineHeight:20}}>I've been noticing how much calmer I feel compared to a month ago. The breathing exercises are really helping.</Text>
            </View>

             <View style={styles.boxContainer}>
                <Text style={styles.promptText}>🖐🏻 Challenging Day</Text>
                <Text style={{textAlign:'justify',letterSpacing:1,lineHeight:20}}>Work was stressful but I managed to take breaks and practice mindfulness. Proud of myself for that.</Text>
            </View>
        </View>


    )
}

export default JournalScreen