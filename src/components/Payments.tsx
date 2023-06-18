import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import React, { forwardRef, ReactElement, Ref, useEffect, useRef, useState } from 'react';
import Order from '../types/Order';
import config from '../config.json';

type PaymentsProps = {
  basketItems: Array<undefined>;
  basketOpen: boolean;
  closeBasket: Function;
};

type OrderItem = {
  Name: string;
  Price: Number;
  Quantity: Number;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Payments: React.FC<PaymentsProps> = (props: PaymentsProps) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const orders = useRef<Array<OrderItem>>([]);
  const onCloseHandler = () => {
    props.closeBasket();
  };

  const endOrderHandler = () => {
    setIsConfirmed(false);
    props.closeBasket();
  };

  const onConfirmHandler = async () => {
    let items = props.basketItems.map((item) => {
      return {
        ProductId: item.ID,
        Quantity: item.Quantity,
      };
    });

    let response = await fetch(`${config.serverURL}/baskets/8/buy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Orders: items }),
    });

    if (response.status === 200) {
      setIsConfirmed(true);
    }
  };

  return (
    <Dialog
      open={props.basketOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={onCloseHandler}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        {isConfirmed ? 'Thanks for buying in PrzemekShop' : 'Are You sure, You want to confirm your order?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {isConfirmed ? 'Your order is under service.' : 'By clicking confirm You will be redirected to your banking service to perform the payment. The list of items in basket:'}
        </DialogContentText>
        {props.basketItems.map((item, idx) => {
          return (
            <div key={idx}>
              <li>
                {item.Name} in quantity of {item.Quantity.toString()} for total
                of {Number(item.Quantity) * Number(item.Price)}$
              </li>
            </div>
          );
        })}
      </DialogContent>
      <DialogActions>
        {isConfirmed ? (
          <Button onClick={endOrderHandler}>Ok</Button>
        ) : (
          <div>
            <Button onClick={onCloseHandler}>Abort</Button>
            <Button onClick={onConfirmHandler}>Confirm</Button>
          </div>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Payments;
