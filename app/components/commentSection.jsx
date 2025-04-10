import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { getCommentsBySuggestionId } from "../lib/commentServices";

const CommentSection = ({ suggestionID }) => {

    //Comment recovery
    const [comments, setComments] = useState(null);
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const fetchedComments = await getCommentsBySuggestionId(suggestionID.trim());
                setComments(fetchedComments);
            } catch (error) {
                console.error('Erreur lors de la récupération des commentaires :', error);
            }
        };
        fetchComments();
    }, [suggestionID]);

    //Loading state
    if (!comments) {
        return (
            <View style={styles.container}>
                <Text style={styles.empty}>
                    Chargement...
                </Text>
            </View>
        );
    }

    //No comments state
    if (comments.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.empty}>
                    Aucun commentaire pour le moment
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{ width: '95%' }}>
                {comments.map(comment => (
                    <View key={comment.id} style={styles.comment}>
                        <Text style={styles.commentCreator}>{comment.creator} à commenté :</Text>
                        <Text style={styles.commentText}>{comment.text}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '5%',
        alignItems: 'center',
    },
    comment: {
        backgroundColor: 'rgba(218, 231, 255, 0.48)',
        borderRadius: 20,
        padding: '5%',
        marginBottom: '3%',
        width: '100%',
    },
    commentCreator: {
        color: '#5A439A',
        fontFamily: 'LilitaOne-Regular',
        fontSize: 18,
    },
    commentText: {
        color: '#000000',
        fontFamily: 'Convergence-Regular',
        fontSize: 16,
        marginLeft: 5,
    },
    empty: {
        color: '#5A439A',
        fontFamily: 'LilitaOne-Regular',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 100,
    },
});

export default CommentSection;