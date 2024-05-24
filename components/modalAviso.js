// components/ModalProdutos.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';



export function ModalAviso({ fechar, visivel }) {

    const navigation = useNavigation()


    async function mudarPagComprar() {
        await AsyncStorage.setItem('@nome', JSON.stringify([]))
        await AsyncStorage.setItem('@valor', JSON.stringify([]))
        await AsyncStorage.setItem('@qtde', JSON.stringify([]))
        fechar()
        navigation.navigate('compras')
    }


    return (
        <Modal visible={visivel} animationType="fade" transparent={true}>
            <BlurView intensity={100} style={styles.fundoModal}>
                <View style={styles.espacoModal}>
                    <TouchableOpacity style={styles.posicaoFechar} onPress={fechar}>
                        <Icon name="times" size={35} color="#404E4D" />
                    </TouchableOpacity>
                    <Text style={styles.modalTitulo}>Você tem certeza que deseja começar uma nova compra? Sua compra em andamento será apagada</Text>
                    <TouchableOpacity style={styles.botao} onPress={mudarPagComprar}>
                        <Text style={styles.textoBotao}>Sim</Text>
                        <Icon name="check" size={20} color="#404E4D" />
                    </TouchableOpacity>
                </View>
            </BlurView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    fundoModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    espacoModal: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'column',
        gap: 10,
        paddingTop: 45,
    },
    posicaoFechar: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    modalTitulo: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'center',
    },
    botao: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        backgroundColor: '#FFC030',
        borderRadius: 5,
        padding: 10,
      },
      textoBotao: {
        color: '#404E4D',
        fontWeight: 'bold',
        marginRight: 5,
      },
});