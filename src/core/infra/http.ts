interface GetOptions {
  params?: URLSearchParams
}

class HttpError extends Error {
  constructor(readonly status: number, readonly message: string) {
    super(message)
  }

  toJSON() {
    return {
      status: this.status,
      message: this.message,
    }
  }
}

export class HttpClient {
  async get<R>(url: string, {params}: GetOptions = {}): Promise<R> {
    const path = url + (params ? `?${params}` : '')
    console.log(path);
    
    try {
      return fetch(path).then((res) => {
        console.log(res);
        
        if (!res.ok) {
          const {status, statusText} = res
          const response = new Response(
            res.body,
            new HttpError(status, statusText)
          )
          throw response
        }
        return res.json()
      })
    } catch (err) {
      throw new Error((err as Error).name)
    }
  }
}
