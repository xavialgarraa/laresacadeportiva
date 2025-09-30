import { StarBackground } from "../components/StarBackground";
import { Error } from "../components/Error";


export const NotFound = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        
        {/* Background */}
        <StarBackground />
    
        <Error />
    
        
        </div>
        
  );
};
