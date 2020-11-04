import { Chip, styled, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { FunctionComponent, useCallback, useState } from 'react'
import { Link } from '../links/Links'
import { SimplePagination } from '../pagination/SimplePagination'
import { TransactionStatusIndicator } from '../progress/ProgressHelpers'
import { BridgeChain, TransactionStatusType } from '../utils/types'

type TransactionType = "mint" | "release";

export type Transaction = {
  date: string;
  time: string;
  type: TransactionType;
  status: TransactionStatusType;
};

const standardPaddings = {
  paddingLeft: 30,
  paddingRight: 30,
};

const useTransactionsHeaderStyles = makeStyles((theme) => ({
  root: {
    ...standardPaddings,
    paddingTop: 20,
    background: theme.customColors.greyHeaderBackground,
  },
}));

type TransactionsHeaderProps = {
  title: string;
};

export const TransactionsHeader: FunctionComponent<TransactionsHeaderProps> = ({
  title,
}) => {
  const styles = useTransactionsHeaderStyles();
  return (
    <div className={styles.root}>
      <Typography variant="h6">{title}</Typography>
    </div>
  );
};

const useTransactionsStatusHeaderStyles = makeStyles((theme) => ({
  root: {
    ...standardPaddings,
    paddingTop: 12,
    paddingBottom: 6,
    background: theme.customColors.greyHeaderBackground,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  title: {
    fontWeight: theme.typography.fontWeightBold,
    lineHeight: 1.2,
  },
}));

export const TransactionsStatusHeader: FunctionComponent<TransactionsHeaderProps> = ({
  title,
}) => {
  const styles = useTransactionsStatusHeaderStyles();
  return (
    <div className={styles.root}>
      <Typography variant="overline" className={styles.title}>
        {title}
      </Typography>
    </div>
  );
};

export const TransactionsPaginationWrapper = styled("div")(({ theme }) => ({
  ...standardPaddings,
  paddingTop: 10,
  paddingBottom: 10,
  backgroundColor: theme.customColors.greyHeaderBackground,
}));

const useTransactionEntryStyles = makeStyles((theme) => ({
  root: {
    ...standardPaddings,
    paddingTop: 18,
    paddingBottom: 18,
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  details: {},
  datetime: {},
  date: {
    marginRight: 6,
  },
  description: {
    marginTop: 3,
    marginBottom: 3,
  },
  links: {},
  link: {
    marginRight: 24,
    "&:last-child": {
      marginRight: 0,
    },
  },
  status: {},
}));

type TransactionEntryProps = {
  chain: BridgeChain;
  status: TransactionStatusType;
  confirmations?: number;
};

export const TransactionEntry: FunctionComponent<TransactionEntryProps> = ({
  chain,
  status,
  confirmations,
}) => {
  const styles = useTransactionEntryStyles();
  return (
    <div className={styles.root}>
      <div className={styles.details}>
        <div className={styles.datetime}>
          <Chip size="small" label="04/02/20" className={styles.date} />
          <Chip size="small" label="23:45:32 UTC" />
        </div>
        <div className={styles.description}>
          <Typography variant="body2">
            Mint 0.9877 renBTC on Ethereum
          </Typography>
        </div>
        <div className={styles.links}>
          <Link href="" external color="primary" className={styles.link}>
            Bitcoin transaction
          </Link>
          <Link href="" external color="primary" className={styles.link}>
            Ethereum transaction
          </Link>
        </div>
      </div>
      <div className={styles.status}>
        <TransactionStatusIndicator
          chain={chain}
          status={status}
          confirmations={confirmations}
        />
      </div>
    </div>
  );
};

export const TransactionsGrid: FunctionComponent<any> = () => {
  const pending = 3;
  const completed = 2;

  const [page, setPage] = useState(0);
  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const itemsCount = 15;
  const itemsPerPage = 4;
  return (
    <div>
      <TransactionsHeader title="Transactions" />
      <TransactionsStatusHeader title={`Pending (${pending})`} />
      <div>
        <TransactionEntry
          chain={BridgeChain.BTCC}
          status="pending"
          confirmations={2}
        />
        <TransactionEntry chain={BridgeChain.BNCC} status="submitted" />
      </div>
      <TransactionsStatusHeader title={`Completed (${completed})`} />
      <div>
        <TransactionEntry chain={BridgeChain.BTCC} status="completed" />
        <TransactionEntry chain={BridgeChain.BNCC} status="completed" />
      </div>
      <TransactionsPaginationWrapper>
        <SimplePagination
          count={itemsCount}
          rowsPerPage={itemsPerPage}
          page={page}
          onChangePage={handleChangePage}
        />
      </TransactionsPaginationWrapper>
    </div>
  );
};
