import { Text, IButtonProps, Button, VStack } from 'native-base';

type Props = IButtonProps & {
    title: string;
    isActive?: boolean;
    type: 'open' | 'closed';
};

export function Filter({ title, isActive = false, type, ...rest } : Props) {
  return (
    <Button
        variant="outline"
    >

    </Button>
  );
}