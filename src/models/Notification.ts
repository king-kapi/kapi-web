/**
 * Data contained inside a notification
 */
export interface Notification {
  /**
   * Icon Code
   */
  icon: string;
  /**
   * bolded message
   */
  messageHighlight: string;
  /**
   * remaining message
   */
  mainMessage: string;
  /**
   * minutes since notification was sent
   */
  timestamp: number;
  /**
   * number of people in party
   */
  partySize: number | undefined;
  /**
   * max number of people for party
   */
  maxPartySize: number | undefined;
}
// Note: the c-style block-comments is rendered inside vscode when you hover over it with your mouse
