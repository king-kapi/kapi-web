/**
 * Data contained inside a party
 */
export interface Party {
    /**
     * Icon Code
     */
    icon: string;
    /**
     * game name
     */
    game: string;
    /**
     * owner of current game party
     */
    partyOwner: string;
    /**
     * number of people in party
     */
    partySize: number;
    /**
     * role party is looking for
     */
    role: string;
    /**
     * max number of people for party
     */
    maxPartySize: number | undefined;
    /**
     * source of party invite
     */
    partySource: string;
  }