import { createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { Attribution } from 'ox/erc8021';

const DATA_SUFFIX = Attribution.toDataSuffix({ codes: ['bc_qyd3sdtd'] });

export const config = createConfig({
  chains: [base],
  transports: { [base.id]: http() },
  dataSuffix: DATA_SUFFIX,
});