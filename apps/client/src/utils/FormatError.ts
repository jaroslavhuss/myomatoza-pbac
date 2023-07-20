// Consistency hook between axios and nestjs errors - I do not like this solution so I will have to come up with something better.
export const formatErrorMessage = (error:any) => {
    if (typeof error.response.data.message === 'string') {
      return {
        message: error.response.data.message,
        rawData: JSON.stringify(error.response)
      }
    } else if (typeof error.response.data.message === 'object') {
      return {
        message:error.response.data.message.response.message.toString(),
        rawData:JSON.stringify(error.response.data.message)
      }
    } else {
      return {
        message: "unknown error occured",
        rawData: JSON.stringify(error.response)
      }
    }
  }