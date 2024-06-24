import { IMoney, Money } from "./Money";

const isNotEmptyStake = ({ totalStake }: { totalStake: IMoney; }) => !Money.isZero(totalStake)


export { isNotEmptyStake }
