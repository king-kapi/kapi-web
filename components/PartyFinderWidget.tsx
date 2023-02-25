import styles from '@/styles/PartyFinderWidget.module.css'
import { Party } from '@/src/models/Party'
import { Icon } from '@iconify/react'

  type PartyFinderProps = {
    parties: Party[];
  }

export default function PartyFinderWidget({ parties }: PartyFinderProps) {
    return (
        <div className={styles.PartyFinderWidgetContainer}>
            <div className={styles.Title}>PARTY FINDER &gt;</div>
            <div className={styles.PartiesContainer}>
                {parties.map((party, index) => (
                        <div className={styles.PartyContainer}>
                            <Icon className={styles.PartyIcon} icon={party.icon}/>
                            <div className={styles.PartyContent}>
                                <h3 className={styles.PartyGame}>{party.game}</h3>
                                <h1 className={styles.PartyOwner}>{party.partyOwner + '\'s Party ' + party.partySize + '/' + party.maxPartySize}</h1>
                                <h3 className={styles.PartyRole}>{'Looking for ' + party.role}</h3>
                            </div>
                            <div className={styles.PartySource}>{party.partySource}</div>
                        </div>
                ))}
            </div>
        </div>
    )
}