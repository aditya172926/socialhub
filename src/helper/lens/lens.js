import { apolloClient } from './apollo';
import { gql } from '@apollo/client'
import { AUTHENTICATION, GET_CHALLENGE, GET_PROFILES } from './query';
import { ethers } from 'ethers';

export const generateChallenge = async (address) => {
    const res = await apolloClient.query({
        query: gql(GET_CHALLENGE),
        variables: {
            request: {
                address,
            }
        }
    });
    return res.data.challenge.text;
}

export const authenticate_user = async (address, signature) => {
    const { data } = await apolloClient.mutate({
        mutation: gql(AUTHENTICATION),
        variables: {
            request: {
                address,
                signature,
            },
        },
    });
    return data.authenticate;
}

export const getProfiles = async (requestParams) => {
    return await apolloClient.query(
      {
        query: gql(GET_PROFILES),
        variables: {
          request: requestParams
        },
      }
    )
  }
  