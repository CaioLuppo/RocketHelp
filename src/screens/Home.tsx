import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Heading, HStack, IconButton, Text, useTheme, VStack, FlatList, Center } from 'native-base';

import auth from "@react-native-firebase/auth";

import { SignOut, ChatTeardropText } from 'phosphor-react-native';
import Logo from '../assets/logo_secondary.svg';

import { Filter } from '../components/filter';
import { Order, OrderProps } from '../components/order';
import { Button } from '../components/button';
import { Alert } from 'react-native';


export function Home() {

    const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
    const [orders, setOrders] = useState<OrderProps[]>([]);

    const navigation = useNavigation();
    const { colors } = useTheme();

    function handleNewOrder(){
        navigation.navigate('new')
    }

    function handleOpenDetails(orderId: string){
        navigation.navigate("details", {orderId})
    }
    
    function handleLogout(){
        auth()
        .signOut()
        .catch( error => {
            console.log(error);
            Alert.alert("Oops!", "Não foi possível sair.");
        });
    }

    return (
        <VStack flex={1} pb={6} bg="gray.700">

            {/* Cabeçalho */}
            <HStack
                w="full"
                justifyContent="space-between"
                alignItems="center"
                bg="gray.600"
                pt={12}
                pb={5}
                px={6}
            >
                
                <Logo />

                <IconButton 
                    icon = {<SignOut size={26} color={colors.gray[300]} />}
                    onPress = {handleLogout}
                />

            </HStack>

            {/* Meus chamados */}
            <VStack flex={1} px={6}>

                {/* Texto do heading */}
                <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">

                    <Heading color="gray.100" >Meus chamados</Heading>

                    <Text color="gray.200"> 3 </Text>
                </HStack>

                {/* Filtros */}
                <HStack space={3} mb={8}>
                    <Filter 
                        type='open'
                        title='Em andamento'
                        onPress={() => setStatusSelected('open')} // quando recebe parâmetro, tem que ser nesse formato
                        isActive={statusSelected === 'open'}
                    />
                    <Filter 
                        type='closed'
                        title='Encerrados'
                        onPress={() => setStatusSelected('closed')}
                        isActive={statusSelected === 'closed'}
                    />
                </HStack>

                {/* Lista de Chamados */}
                <FlatList 
                    data={orders}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <Order data={item} onPress={() => handleOpenDetails(item.id)}/>}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    ListEmptyComponent={() => (
                        <Center>
                            <ChatTeardropText color={colors.gray[300]} size={40} />
                            <Text color="gray.300" fontSize="xl" mt={6} textAlign="center" >
                                Você ainda não possui {"\n"}
                                solicitações {statusSelected === 'open' ? 'em andamento.' : 'finalizadas.'}
                            </Text>
                        </Center>
                    )}
                />

                {/* Botão de Nova Solicitação */}
                <Button title='Nova Solicitação' onPress={handleNewOrder}/>

            </VStack>

        </VStack>
    );
}