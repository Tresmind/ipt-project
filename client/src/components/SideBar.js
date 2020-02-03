import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import './sidebar.css'

 function SideBar({items})  {
    
        return (
            <div className="sidebar">
                <p>All Categories</p>
                <hr></hr>
                <List disablePadding dense>
                    {items.map(({label,name,...rest}) => (
                        <ListItem key={name} button {...rest}>
                            <ListItemText>{label}</ListItemText>
                        </ListItem>
                    ))}
                 
                </List>
            </div>
        )
  
}

export default SideBar
