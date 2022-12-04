import {StatusCodes} from 'http-status-codes';
import {AxiosError, AxiosResponse} from 'axios';
import {toast} from 'react-toastify';
import browserHistory from '../../browser-history';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

function useErrorHandler(error: AxiosError<{ error: string }>) {
  const shouldDisplayError = (response: AxiosResponse) => StatusCodeMapping[response.status];

  if (error.response && shouldDisplayError(error.response)) {
    if (error.response.status === StatusCodes.BAD_REQUEST || error.response.status === StatusCodes.UNAUTHORIZED) {
      if (error.config.method === 'post') {
        toast.error(error.response.data.error);
      }
    } else if (error.response.status === StatusCodes.NOT_FOUND) {
      browserHistory.push('/404');
    } else {
      toast.warn(error.response.data.error);
    }
  }
}

export default useErrorHandler;
