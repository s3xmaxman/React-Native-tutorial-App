import { View, Text } from "react-native";

const InfoBox = ({ title, subtitle, containerStyle, titleStyle }) => {
    return (
        <View className={containerStyle}>
            <Text className={`text-white text-center font-psemibold ${titleStyle}`}>
                {title}
            </Text>
            <Text className="text-gray-100 text-center font-pregular text-sm">
                {subtitle}
            </Text>
        </View>
    )
}

export default InfoBox