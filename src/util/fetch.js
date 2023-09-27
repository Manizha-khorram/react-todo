const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`
const listUrl = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME_LIST}`

export const FirstfetchData = async () => {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
    }

    try {
        const todoResponse = await fetch(
            `${url}/?sort[0][field]=Title&sort[0][direction]=asc`,
            options
        )
        const listResponse = await fetch(listUrl, options)

        if (!todoResponse.ok) {
            console.log(`err: ${await todoResponse.json()}`)
            throw new Error(`Error has occured ${todoResponse.status}`)
        }

        if (!listResponse.ok) {
            console.log(`err: ${await listResponse.json()}`)
            throw new Error(`Error has occured ${listResponse.status}`)
        }

        const todoData = await todoResponse.json()
        const listData = await listResponse.json()

        return { todoData, listData }
    } catch (err) {
        throw new Error(err.message)
    }
}

export const FetchTodoItems = async (newTodo, isListVisible, todoList) => {
    try {
        const completedDate = new Date()
        const completedDateISO = completedDate.toISOString()
        const listVisible = todoList[isListVisible]

        //record to post the data
        const recordData = {
            records: [
                {
                    fields: {
                        Title: newTodo.title,
                        completedAt: completedDateISO,
                        ListId: listVisible.id,
                    },
                },
            ],
        }

        //header
        const headers = {
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(recordData),
        })

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }

        const newRecord = await response.json()
        return newRecord
    } catch (err) {
        throw new Error(err.message)
    }
}

export const PostNewLIst = async (title) => {
    try {
        const listRecord = {
            records: [
                {
                    fields: {
                        ListName: title,
                        Descriptions: '',
                    },
                },
            ],
        }

        const headers = {
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
        }

        const response = await fetch(listUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(listRecord),
        })

        if (!response.ok) {
            throw new Error(` Error Occurred: ${response.status}`)
        }

        const newListData = await response.json()

        return newListData
    } catch (err) {
        throw new Error(err.message)
    }
}

export const RemoveTodoItems = async (id) => {
    try {
        const options = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            },
        }

        const response = await fetch(`${url}/${id}`, options)
        if (!response.ok) {
            throw new Error(`Error occured: ${response.status}`)
        }

        return
    } catch (err) {
        throw new Error(err.message)
    }
}

export const RemoveListItem = async (id) => {
    try {
        const options = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            },
        }

        const response = await fetch(`${listUrl}/${id}`, options)

        if (!response.ok) {
            // console.log(`erorr:${await response.json()}`)
            throw new Error(`Error occured: ${response.status}`)
        }
    } catch (err) {
        throw new Error(err.message)
    }
}
