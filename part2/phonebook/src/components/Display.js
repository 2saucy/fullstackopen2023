import Button from "./Button"

const Display = ({ filter, persons, deletePerson }) => {

    return(
      <div>
        {
          persons
            .filter( person => person.name.toLowerCase().startsWith(filter.toLowerCase()))
            .map( person => (
              <div key={person.id}>
                <span>{person.name} {person.number}</span>
                <Button name={person.name} id={person.id} deletePerson={deletePerson} />
              </div>
            ))
        }
      </div>
    )
}

export default Display