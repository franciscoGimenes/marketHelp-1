// components/ModalProdutos.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/FontAwesome';
import Armazenamento from '../hooks/bancoCompras';
import { useFonts } from 'expo-font';


export function ModalProdutos({ fechar, visivel }) {
  const [nomeProduto, setNomeProduto] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [preco, setPreco] = useState('');

  const { salvarItem } = Armazenamento();

  async function salvarProduto() {

    let precoFormatado = preco;
    if (preco.includes(',')) {
      precoFormatado = preco.replace(',', '.');
    }

      await salvarItem("@nome", nomeProduto);
      await salvarItem("@valor", (quantidade * precoFormatado).toFixed(2));
      await salvarItem("@qtde", quantidade);

      setNomeProduto('')
      setQuantidade(1)
      setPreco('')
    fechar();
  }

  function adicionarQuantidade() {
    setQuantidade(quantidade + 1);
  }

  function removerQuantidade() {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  }

  useFonts({ 'Gobold': require('../assets/fonts/Gobold Regular.otf') });


  return (
    <Modal visible={visivel} animationType="fade" transparent={true}>
      <BlurView intensity={100} style={styles.fundoModal}>
        <View style={styles.espacoModal}>
          <TouchableOpacity style={styles.posicaoFechar} onPress={fechar}>
            <Icon name="times" size={35} color="#404E4D" />
          </TouchableOpacity>
          <Text style={styles.modalTitulo}>Adicionar Produto</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do Produto"
            value={nomeProduto}
            onChangeText={setNomeProduto}
          />
          <TextInput
            style={styles.input}
            placeholder="Preço"
            value={preco}
            onChangeText={setPreco}
            keyboardType="numeric"
          />
          <View style={styles.quantidadeContainer}>
            <Text style={styles.quantidadeLabel}>Quantidade:</Text>
            <View style={styles.quantidadeBotoes}>
              <TouchableOpacity style={styles.quantidadeBotao} onPress={removerQuantidade}>
                <Icon name="minus" size={20} color="#404E4D" />
              </TouchableOpacity>
              <Text style={styles.quantidadeTexto}>{quantidade}</Text>
              <TouchableOpacity style={styles.quantidadeBotao} onPress={adicionarQuantidade}>
                <Icon name="plus" size={20} color="#404E4D" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.botao} onPress={salvarProduto}>
            <Text style={styles.textoBotao}>salvar</Text>
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
  quantidadeContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  quantidadeLabel: {
    fontSize: 16,
    color: '#404E4D',
    marginBottom: 5,
  },
  quantidadeBotoes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantidadeBotao: {
    backgroundColor: '#FFC030',
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
  },
  quantidadeTexto: {
    fontSize: 16,
    color: '#404E4D',
    paddingHorizontal: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
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

    marginRight: 5,
    fontFamily: 'Gobold'

  },
});