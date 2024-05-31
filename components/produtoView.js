import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export function CaixaToken({ token, valor, removerToken, qtde }) {
    return (



        <View style={styles.BotaoAnterior}>
            <View style={styles.conteudoBotoes}>
                <View style={styles.conteudoTxt}>
                    <Text style={styles.tokenText}>{qtde}x {token}</Text>
                    <Text style={styles.valorText}>R$ {valor}</Text>

                </View>
                <TouchableOpacity onPress={removerToken}>
                    <Icon name="trash" size={25} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#FFF',
        borderRadius: 5,
    },
    tokenText: {
        fontSize: 16,
    },
    valorText: {
        fontSize: 16,
        color: '#777',
    },
    BotaoAnterior: {
        marginTop: 10,
        width: 300,
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 15,
        borderColor: '#000',
        borderWidth: 3,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    conteudoBotoes: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    conteudoTxt:{
        flexDirection: 'column',
        alignItems: 'flex-start'
    }
});