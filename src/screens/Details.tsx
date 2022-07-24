import { Box, HStack, ScrollView, VStack } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { Text, useTheme } from 'native-base';

import { Header } from '../components/header';
import { OrderProps } from '../components/order';
import { useEffect, useState } from 'react';
import { OrderFirestoreDTO } from '../DTOs/OrdersDTO';
import { dateFormat } from '../utils/firestoreDateFormat';
import { Loading } from '../components/loading';
import { CircleWavyCheck, DesktopTower, Hourglass, ClipboardText } from 'phosphor-react-native';
import { CardDetails } from '../components/cardDetails';
import { Input } from '../components/input';
import { Button } from '../components/button';
import { Alert } from 'react-native';

type RouteParams = {
    orderId: string;
}

type OrderDetails = OrderProps & {
  description: string;
  solution: string;  
  closed: string;
}

export function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [solution, setSolution] = useState('');
  const [order, setOrders] = useState<OrderDetails>({} as OrderDetails);

  const navigation = useNavigation();
  const { colors } = useTheme();
  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  function handleOrderClose() {
    if(!solution){
      return Alert.alert("Solicitação", "Informe a solução para encerrar a solicitação.")
    }

    firestore()
    .collection<OrderFirestoreDTO>('orders')
    .doc(orderId)
    .update({
      status: 'closed',
      solution,
      closed_at: firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      Alert.alert("Sucesso!", "Solução registrada no sistema.")
      navigation.goBack();
    })
    .catch(error => {
      console.log(error)
      Alert.alert("Erro", "Não foi possível registrar a solução.")
    })
  }

  useEffect(() => {
    firestore()
    .collection<OrderFirestoreDTO>('orders')
    .doc(orderId)
    .get()
    .then(
      doc => {
        const { patrimony, description, status, created_at, closed_at, solution } = doc.data();

        const closed = closed_at ? dateFormat(closed_at) : null;

        setOrders({
          id: doc.id,
          patrimony,
          status,
          solution,
          description,
          when: dateFormat(created_at),
          closed
        });

        setIsLoading(false);

    })
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.700">
        <Box px={6} bg="gray.600">
          <Header title="Solicitação" />
        </Box>

        <HStack bg='gray.500' justifyContent='center' padding={4}>
          {
            order.status === 'closed'
            ? <CircleWavyCheck size={22} color={colors.green[300]}/>
            : <Hourglass size={22} color={colors.secondary[700]}/>
          }

          <Text 
            fontSize='sm' 
            color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
            ml={2}
            textTransform='uppercase'
          >
            {order.status === 'closed' ? 'finalizado' : 'em andamento'}
          </Text>
        </HStack>

        <ScrollView mx={5} showsVerticalScrollIndicator={false}>
            <CardDetails 
              title='equipamento'
              description={`Patrimônio ${order.patrimony}`}
              icon={DesktopTower}
              
            />
            <CardDetails 
              title='Descrição do Problema'
              description={`${order.description}`}
              icon={ClipboardText}
              footer={`Registrado em ${order.when}`}
            />
            <CardDetails 
              title='solução'
              icon={CircleWavyCheck}
              description={order.solution}
              footer={!!order.closed && `Encerrado em ${order.closed}`}
            >
              {
                order.status === 'open' &&
                <Input 
                placeholder='Descrição da Solução'
                onChangeText={setSolution}
                h={24}
                textAlignVertical='top'
                multiline
              />}
            </CardDetails>
        </ScrollView>


        {
          order.status === 'open' && <Button 
            title='Encerrar solicitação'
            m={5}
            onPress={handleOrderClose}
          />
        }


    </VStack>
  );
}