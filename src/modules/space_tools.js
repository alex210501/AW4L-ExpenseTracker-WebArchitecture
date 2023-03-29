function cleanCollaborators(collaborators) {
    var users = []
    
    for (let user of collaborators) {
        users.push(user.dataValues.user_username)
    }
    
    return users
}

function removeCollaboratorsSpaceFromResults(result) {
    const collaborators = cleanCollaborators(result.dataValues.collaborators_space)
    const { collaborators_space: _, ...resultWithoutCollaboratorsSpace } = result.dataValues

    return {
        ...resultWithoutCollaboratorsSpace,
        collaborators: collaborators,
    }
}

module.exports = {
    cleanCollaborators,
    removeCollaboratorsSpaceFromResults   
}