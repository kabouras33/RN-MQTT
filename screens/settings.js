import { View, Text, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
function Settings() {
    const [Hour_on, onChangeHour_on] = useState("Hour");
    const [Minutes_on, onChangeMinutes_on] = useState("Minutes");
    const [Hour_off, onChangeHour_off] = useState("Hour");
    const [Minutes_off, onChangeMinutes_off] = useState("Minutes");
    return (
        <View styles={styles.root}>
            <Text styles={styles.text}>Settings</Text>
            <View style={{ flexDirection: "row", marginTop: 100, justifyContent: "center" }}>
                <View>
                    <TextInput style={styles.input}
                        onChangeText={onChangeHour_on}
                        value={Hour_on} />
                </View>
                <View>
                    <TextInput style={styles.input}
                        onChangeText={onChangeMinutes_on}
                        value={Minutes_on} />
                </View>
            </View>
            <Text styles={styles.text}>Settings</Text>
            <View style={{ flexDirection: "row", marginTop: 50, justifyContent: "center" }}>
                <View>
                    <TextInput style={styles.input}
                        onChangeText={onChangeHour_off}
                        value={Hour_off} />
                </View>
                <View>
                    <TextInput style={styles.input}
                        onChangeText={onChangeMinutes_off}
                        value={Minutes_off} />
                </View>
            </View>
        </View>
    );
}

export default Settings;

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    text: {

        margin: 8
    },

    input: {
        height: 40,
        width: 120,
        margin: 20,
        borderWidth: 1,
        padding: 10,

    }

});

