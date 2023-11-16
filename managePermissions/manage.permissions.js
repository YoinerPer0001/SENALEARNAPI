
export const adminPermissions = (rolId, res) => {
    if (rolId != 2) {
        return false
        
    }else{

        return true
    }
}

export const UserPermissions = (rolId, res) => {
    if (rolId != 1) {
        return false
        
    }else{
        return true
    }
}