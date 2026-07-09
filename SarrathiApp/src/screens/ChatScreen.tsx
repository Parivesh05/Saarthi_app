import { useState, useRef } from "react";
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Animated,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "src/styles/chatScreen.style";
import { CHAT_MESSAGES, CHAT_USER } from "@utils/chatDummyData";
import { colors } from "src/styles/theme/colors";
import { ChatMessage } from "src/interface/Chat/chat.interface";
import { chatService, getChatErrorMessage } from "src/services/chatService";
import { useAppSelector } from "src/hooks/useRedux";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "src/constants/designTokens";
import { Images } from "src/assets/images";

const formatChatTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const ChatScreen = () => {
    const navigation = useNavigation();
    const authUser = useAppSelector((state) => state.auth.user);
    const [messages, setMessages] = useState<ChatMessage[]>(CHAT_MESSAGES.slice(0, 1));
    const [inputText, setInputText] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [isDistress, setIsDistress] = useState(false);
    const [showQuickReplies, setShowQuickReplies] = useState(true);
    const [disclaimerDismissed, setDisclaimerDismissed] = useState(false);
    const flatListRef = useRef<FlatList>(null);
    const owlPulse = useRef(new Animated.Value(1)).current;

    const quickReplies = [
        "I'm feeling happy 😊",
        "Feeling stressed 😰",
        "Need motivation 💪",
    ];

    // Animate owl while typing
    const startOwlAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(owlPulse, {
                    toValue: 1.2,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(owlPulse, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    const sendMessage = async (text?: string) => {
        const messageText = text || inputText.trim();
        if (!messageText || isSending) return;

        setShowQuickReplies(false);
        const sentMessageCount = messages.filter((message) => message.isSent).length;
        const userMessage: ChatMessage = {
            id: `user-${Date.now()}`,
            text: messageText,
            time: formatChatTime(),
            isSent: true,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputText("");
        setIsSending(true);
        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);

        try {
            const response = await chatService.sendMessage({
                message: messageText,
                user_id: authUser?.id ? String(authUser.id) : "test_mobile_user_001",
                is_first_message: sentMessageCount === 0,
            });

            if (response.is_distress) setIsDistress(true);

            const timestamp = formatChatTime();
            const distress = response.is_distress;
            response.messages.forEach((msg, index) => {
                const scheduleAppend = () => {
                    const botMessage: ChatMessage = {
                        id: `bot-${Date.now()}-${index}`,
                        text: msg.content,
                        time: timestamp,
                        isSent: false,
                        messageType: msg.type,
                        isDistress: distress,
                    };
                    setMessages((prev) => [...prev, botMessage]);
                    flatListRef.current?.scrollToEnd({ animated: true });
                };
                setTimeout(scheduleAppend, msg.delay_ms);
            });
        } catch (error) {
            const errorMessage: ChatMessage = {
                id: `error-${Date.now()}`,
                text: getChatErrorMessage(error),
                time: formatChatTime(),
                isSent: false,
                isError: true,
            };
            setMessages((prev) => [...prev, errorMessage]);

            // Show owl with error message
            setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
        } finally {
            setIsSending(false);
            setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
        }
    };

    /** Returns the correct bubble style for a received message based on its type */
    const getReceivedBubbleStyle = (item: ChatMessage) => {
        if (item.isError) return styles.bubbleError;
        if (item.messageType === 'question') return styles.bubbleQuestion;
        if (item.messageType === 'closing') return styles.bubbleClosing;
        return styles.bubbleReceived;
    };

    /** Returns the correct text style for a received message bubble */
    const getReceivedTextStyle = (item: ChatMessage) => {
        if (item.messageType === 'closing') return styles.bubbleTextClosing;
        return styles.bubbleTextReceived;
    };

    const renderMessage = ({ item }: { item: ChatMessage }) => (
        <View style={[styles.messageRow, item.isSent ? styles.messageRowSent : styles.messageRowReceived]}>
            {!item.isSent && (
                <Image source={Images.ON_BOARDING_1} style={styles.msgAvatar} />
            )}
            <View style={styles.messageContent}>
                <View style={[styles.bubble, item.isSent ? styles.bubbleSent : getReceivedBubbleStyle(item)]}>
                    <Text style={item.isSent ? styles.bubbleTextSent : getReceivedTextStyle(item)}>
                        {item.text}
                    </Text>
                </View>
                <Text style={[styles.timeText, item.isSent && styles.timeTextSent]}>
                    {item.time}
                </Text>
            </View>
        </View>
    );

    return (
        <LinearGradient
            colors={[Colors.appBgGradientStart, Colors.appBgGradientEnd]}
            style={styles.screen}
        >
            <KeyboardAvoidingView
                style={styles.screen}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
                {/* ── Header ── */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={22} color={colors.TEXT_PRIMARY} />
                    </TouchableOpacity>
                    <View style={styles.avatarWrapper}>
                        <Image source={Images.ON_BOARDING_1} style={styles.avatar} />
                        {CHAT_USER.isOnline && <View style={styles.onlineDot} />}
                    </View>
                    <View style={styles.headerInfo}>
                        <Text style={styles.headerName}>{CHAT_USER.name}</Text>
                        <Text style={styles.headerSubtitle}>
                            {CHAT_USER.isOnline ? "🟢 Online" : CHAT_USER.subtitle}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.headerAction}>
                        <Ionicons name="ellipsis-vertical" size={20} color={colors.TEXT_PRIMARY} />
                    </TouchableOpacity>
                </View>

                {/* ── Mental Health Disclaimer ── */}
                {!disclaimerDismissed && (
                    <View style={disclaimerStyles.banner}>
                        <Ionicons name="information-circle-outline" size={16} color="#7C3AED" style={{ marginTop: 1 }} />
                        <Text style={disclaimerStyles.text}>
                            uBudy is a wellness companion, not a substitute for professional care.
                            {' '}<Text style={disclaimerStyles.bold}>In a crisis?</Text>
                            {' '}Call <Text style={disclaimerStyles.hotline}>iCall: +91 8840209873</Text>
                        </Text>
                        <TouchableOpacity onPress={() => setDisclaimerDismissed(true)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                            <Ionicons name="close" size={16} color="#7C3AED" />
                        </TouchableOpacity>
                    </View>
                )}

                {/* ── Messages ── */}
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={renderMessage}
                    style={styles.messageList}
                    contentContainerStyle={styles.messageListContent}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustKeyboardInsets
                    ListFooterComponent={
                        isSending ? (
                            <View style={styles.typingRow}>
                                <Image source={Images.ON_BOARDING_1} style={styles.msgAvatar} />
                                <View style={[styles.bubble, styles.bubbleReceived, styles.typingBubble]}>
                                    <Animated.Image
                                        source={Images.ON_BOARDING_1}
                                        style={[
                                            styles.typingOwl,
                                            { transform: [{ scale: owlPulse }] }
                                        ]}
                                        onLoad={startOwlAnimation}
                                    />
                                    <Text style={styles.typingText}>Ubudy is typing...</Text>
                                </View>
                            </View>
                        ) : null
                    }
                />

                {/* ── Distress Banner ── */}
                {isDistress && (
                    <View style={styles.distressBanner}>
                        <Ionicons name="alert-circle" size={18} color="#BE123C" />
                        <Text style={styles.distressBannerText}>
                            If you're in crisis, please call +91 8840209873 — a counselor is available now.
                        </Text>
                    </View>
                )}

                {/* ── Quick Replies ── */}
                {showQuickReplies && messages.length === 1 && (
                    <View style={styles.quickRepliesContainer}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.quickRepliesRow}>
                                {quickReplies.map((reply, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.quickReplyChip}
                                        onPress={() => sendMessage(reply)}
                                        disabled={isSending}
                                    >
                                        <Text style={styles.quickReplyText}>{reply}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                )}

                {/* ── Input Bar ── */}
                <View style={styles.inputBar}>
                    <TouchableOpacity style={styles.attachBtn}>
                        <Ionicons name="add" size={22} color={colors.PRIMARY} />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Type a message..."
                        placeholderTextColor={colors.GREY}
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                        returnKeyType="default"
                        editable={!isSending}
                    />
                    <TouchableOpacity style={styles.micBtn}>
                        <Ionicons name="mic-outline" size={22} color={colors.PRIMARY} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.sendBtn, (!inputText.trim() || isSending) && styles.sendBtnDisabled]}
                        onPress={() => sendMessage()}
                        disabled={!inputText.trim() || isSending}
                    >
                        <Ionicons
                            name="send"
                            size={18}
                            color={inputText.trim() && !isSending ? colors.WHITE : colors.GREY}
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

export default ChatScreen;

import { StyleSheet } from 'react-native';

const disclaimerStyles = StyleSheet.create({
    banner: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        backgroundColor: '#F0EDFC',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0D9F8',
    },
    text: {
        flex: 1,
        fontSize: 12,
        color: '#4C2D8C',
        lineHeight: 17,
        fontWeight: '500',
    },
    bold: {
        fontWeight: '800',
        color: '#3B1F6E',
    },
    hotline: {
        fontWeight: '800',
        color: '#EF5B5B',
    },
});
