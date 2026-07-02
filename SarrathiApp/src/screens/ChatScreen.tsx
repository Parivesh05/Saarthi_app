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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "src/styles/chatScreen.style";
import { CHAT_MESSAGES, CHAT_USER } from "@utils/chatDummyData";
import { colors } from "src/styles/theme/colors";
import { ChatMessage } from "src/interface/Chat/chat.interface";
import { chatService, getChatErrorMessage } from "src/services/chatService";
import { useAppSelector } from "src/hooks/useRedux";

const formatChatTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const ChatScreen = () => {
    const navigation = useNavigation();
    const authUser = useAppSelector((state) => state.auth.user);
    const [messages, setMessages] = useState<ChatMessage[]>(CHAT_MESSAGES.slice(0, 1));
    const [inputText, setInputText] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [isDistress, setIsDistress] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    const sendMessage = async () => {
        const trimmed = inputText.trim();
        if (!trimmed || isSending) return;

        const sentMessageCount = messages.filter((message) => message.isSent).length;
        const userMessage: ChatMessage = {
            id: `user-${Date.now()}`,
            text: trimmed,
            time: formatChatTime(),
            isSent: true,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputText("");
        setIsSending(true);
        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);

        try {
            const response = await chatService.sendMessage({
                message: trimmed,
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
                <Image source={{ uri: CHAT_USER.avatar }} style={styles.msgAvatar} />
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
        <View style={styles.screen}>
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
                        <Image source={{ uri: CHAT_USER.avatar }} style={styles.avatar} />
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
                                <Image source={{ uri: CHAT_USER.avatar }} style={styles.msgAvatar} />
                                <View style={[styles.bubble, styles.bubbleReceived, styles.typingBubble]}>
                                    <ActivityIndicator size="small" color={colors.PRIMARY} />
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
                    <TouchableOpacity
                        style={[styles.sendBtn, (!inputText.trim() || isSending) && styles.sendBtnDisabled]}
                        onPress={sendMessage}
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
        </View>
    );
};

export default ChatScreen;
