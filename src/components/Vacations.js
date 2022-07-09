import React, { useEffect, useState } from "react";
import { apiCall, fetchVacations } from "../utils/api"

const Vacations = ({vacations, setVacations}) => {
    const [search, setSearch] = useState('');

    useEffect(() => (async () => setVacations(await fetchVacations()))(), [])

    const searchMatches = (vacations) => {
        return `${vacation.location} ${vacation.description}`
        .toLowerCase()
        .includes(search,toLowerCase())
    }
    return <>

    <h1>Vacations</h1>

    <input 
        onChange={(event) => setSearch(event.target.value)}
        type="text" name="search" placeholder="search"
    />
    <ul>
        {
            vacations.filter(vacation => {
                return searchMatches(vacation)
            }).map(vacation => {
                return <li>
                    <div>{vacation.location}</div>
                    <div>{vacation.description}</div>
                </li>
            })
        }
    </ul>
    </>
}

export default Vacations;