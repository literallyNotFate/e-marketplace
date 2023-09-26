import client from "./prisma";
import toast from "react-hot-toast";

export function getFileExtension(file) {
    return file.name.substring(file.name.lastIndexOf('.') + 1);
}

export async function getUserByEmail(email) {
    const data = await client.user.findFirst({
        where: {
            email
        }
    });

    return data
}

export function getFormattedDate(date) {
    const data = new Date(date)
    const currentMonth = data.toLocaleString('en', { month: 'long' });
    return `${currentMonth.substring(0, 3)}. ${data.getDate()}, ${data.getFullYear()}`
}


export function calculateTimeSince(date) {
    const data = new Date(date)
    var seconds = Math.floor((new Date() - data) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
        return Math.floor(interval) + " years";
    }

    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }

    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days";
    }

    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }

    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }
    
    return Math.floor(seconds) + " seconds";
}


export async function fetchActions(url, options) { 
    const response = await fetch(url, options)

    if (!response.ok) {
        const text = await response.text();
        toast.error(text)
        return
    }
        
    const jsonResponse = await response.json();
    toast.success(jsonResponse.success)

    return jsonResponse.result
}


export function reload() {
    setTimeout(() => {
        window.location.reload(false)
    }, 1000)
}


export function getPublicIdFromUrl(url) {
    return url.split("/").pop().split(".")[0];
};