interface iChooseWallet {
  wallets: any[];
  choosenWallet: any;
  onWalletChange: () => void;
}

export const ChooseWallet = ({wallets, choosenWallet, onWalletChange}: iChooseWallet) => {

  return (
    <div>
      <div>{choosenWallet.name}</div>
    </div>
  )
}
