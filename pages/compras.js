import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity, Animated, FlatList } from 'react-native';
import { ModalProdutos } from '../components/ModalProdutos'; 
import { ModalBan } from '../components/modalBan';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import Armazenamento from '../hooks/bancoCompras';
import { CaixaToken } from '../components/produtoView';
import { useFonts } from 'expo-font';


export default function Compras() {
  useFonts({ 'Gobold': require('../assets/fonts/Gobold Regular.otf') });

  const navigation = useNavigation();
  const [telaModal, configTelaModal] = useState(false);
  const [telaModalBan, configTelaModalBan] = useState(false);
  const [img, configImg] = useState(true);
  const telaAtiva = useIsFocused();
  const [listaProdutos, defListaProdutos] = useState([]);
  const [listaValores, defListaValores] = useState([]);
  const [listaQuantidade, defListaQuantidade] = useState([]);
  const { obterItem, removerItem } = Armazenamento();
  const [somaValores, setSomaValores] = useState(0);

  const [fadeAnim] = useState(new Animated.Value(0)); // Inicializa a opacidade com 0

  async function deletarToken(item) {
    const index = listaProdutos.indexOf(item);
    if (index !== -1) {
      const novosProdutos = [...listaProdutos];
      novosProdutos.splice(index, 1);

      const novosValores = [...listaValores];
      novosValores.splice(index, 1);

      const novosQtde = [...listaQuantidade];
      novosQtde.splice(index, 1);

      defListaProdutos(novosProdutos);
      defListaValores(novosValores);
      defListaQuantidade(novosQtde);

      await removerItem("@nome", item);
      await removerItem("@valor", listaValores[index]);
      await removerItem("@qtde", listaQuantidade[index]);

      verificarIMG(novosProdutos);
      calcularSomaValores(novosValores);
    }
  }

  async function carregarProdutos() {
    const valores = await obterItem("@valor");
    const produtos = await obterItem("@nome");
    const qtde = await obterItem("@qtde");

    defListaProdutos(produtos);
    defListaValores(valores);
    defListaQuantidade(qtde);

    verificarIMG(produtos);
    calcularSomaValores(valores);
  }

  useEffect(() => {
    if (telaAtiva) {
      carregarProdutos();
    }
  }, [telaAtiva]);

  useEffect(() => {
    if (img) {
      iniciarAnimacao();
    }
  }, [img]);

  function iniciarAnimacao() {
    Animated.timing(fadeAnim, {
      toValue: 1, // Aumenta a opacidade para 1
      duration: 500, // Duração da animação em milissegundos
      useNativeDriver: true,
    }).start();
  }

  function abrirModal() {
    configTelaModal(true);
  }

  function abrirModalBan(){
    configTelaModalBan(true)
  }

  function verificarIMG(produtos) {
    if (produtos.length === 0) {
      configImg(true);
    } else {
      configImg(false);
    }
  }

  function fecharModal() {
    configTelaModal(false);
    configTelaModalBan(false);
    carregarProdutos();
  }

  function calcularSomaValores(valores) {
    const soma = valores.reduce((acc, val) => acc + parseFloat(val), 0).toFixed(2);
    setSomaValores(soma);
  }

  return (
    <LinearGradient colors={['#FFFFFF', '#FCE8B2']} style={styles.container}>
      <ModalProdutos fechar={fecharModal} visivel={telaModal} />
      <ModalBan fechar={fecharModal} visivel={telaModalBan} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('index')}>
          <Icon name="caret-left" size={60} color="#404E4D" />
        </TouchableOpacity>
        <View style={styles.total}>
          <Text style={styles.valorTXT}>Total:</Text>
          <Text style={styles.valorTXT}>R$ {somaValores}</Text>
        </View>
        <TouchableOpacity onPress={abrirModalBan}> 
          <Icon name="ban" size={35} color="#404E4D" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.BotaoAnterior} onPress={abrirModal}>
        <View style={styles.conteudoBotoes}>
          <Text style={styles.compraAnterior}>Clique e adicione o produto</Text>
          <Icon name="plus-square" size={30} color="#545454" />
        </View>
      </TouchableOpacity>

      {img && (
        <Animated.Image
          style={[styles.imagemCompra, { opacity: fadeAnim }]}
          source={require('../assets/compra.png')}
          resizeMode="cover"
        />
      )}

      <FlatList
        style={styles.FlatList}
        data={listaProdutos}
        keyExtractor={(item, index) => String(index)}
        extraData={[listaValores, listaQuantidade]}
        scrollEnabled={true}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item, index }) => (
          <CaixaToken
            token={item}
            valor={listaValores[index]}
            qtde={listaQuantidade[index]}
            removerToken={() => deletarToken(item)}
          />
        )}
      />

      <StatusBar         barStyle="light-content" 
        backgroundColor="black"  />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    margin:40,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 60,
  },
  imageHeader: {
    width: 50,
    height: 80,
  },
  BotaoAnterior: {
    marginTop: 40,
    width: 300,
    height: 80,
    backgroundColor: '#FFC030',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compraAnterior: {
    color: '#545454',
    fontSize: 15,
    marginRight: 20,
    fontFamily: 'Gobold'

  },
  conteudoBotoes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  FlatList: {
    flex: 1,
    width: '100%',
  },
  flatListContent: {

    justifyContent: 'center',
    alignItems: 'center',
  },
  imagemCompra: {
    width: '100%',
    height: undefined,
    aspectRatio: 1, // Ajuste a proporção da imagem
    position: 'absolute',
    bottom: 0,
  },
  valorTXT: {
    fontSize: 23,
  },
  total: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
