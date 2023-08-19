import styles from '@/src/styles/ProfileCard.module.css'
import { useState } from 'react'
import Tag from './Tag'
import Button from './Button'

export default function ProfileCard() {
    const [mode, setMode] = useState('dark')
    const tags = [{name: 'World of WarCraft', border: false},{name: 'League of Legends', border: false},{name: 'POC Gamer', border: true},{name: 'Non-Binary', border: true},{name: 'NA Region', border: false},{name: 'PST - Time Zone', border: false}]
    return (
        <div className={[styles.ProfileCardContainer, `theme-${mode} bg-mediumGrey text-textColor`].join(' ')}>
            <div className={styles.Avatar}></div>
            <h1 className={styles.Username}>WoWPlayer123</h1>
            <div className={styles.Tags}>
                {tags.map(tag => {
                    return(<Tag size='small' border={tag.border}>{tag.name}</Tag>)
                })}
            </div>
            <Button className={styles.Button}>View Profile</Button>
        </div>
    )
}