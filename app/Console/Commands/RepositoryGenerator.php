<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use File;

class RepositoryGenerator extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:repository {name} {model}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $name = $this->argument('name');
        $contractName = $this->contractName($name);
        $appPath = base_path()  . "/app";
        $contractPath = $appPath . '/Contracts/Repository/' . $contractName . '.php';
        $repoName = ucfirst($name) . 'Repository';
        $repoPath =  $appPath . '/Repositories/Eloquent/' . $repoName . '.php';
        $model = ucfirst($this->argument('model'));
        $modelPath = $appPath . "/Models/" . $model . ".php";

        if(file_exists($repoPath))
        {
            $this->error('Error: Repository "' . $repoName . '.php" already exists!');
            return null;
        }

        if(!file_exists($modelPath))
        {
            $this->call('generate:model', [
                'model' => $model
            ]);

            $this->info("Model file created: " .  $modelPath);
        }
             
        File::put($repoPath, $this->repositoryContents($name,  $model));
        File::chmod($repoPath, 0755);

        File::put($contractPath, $this->contractContents($name));
        File::chmod($contractPath, 0755);

        $this->line("Add this file to RepositoryServiceProvider.php");
        $this->info('$this->app->bind("App\Contracts\Repository\\' . $contractName . '", "App\Repositories\Eloquent\\' . $repoName . '");');

    }

    private function contractName($name)
    {
        return ucfirst($name) . 'RepositoryContract ';   
    }

    private function contractContents($name)
    {
        $interfaceName = $this->contractName($name);
return "
<?php

namespace App\Contracts\Repository;

use Prettus\Repository\Contracts\RepositoryInterface;

interface {$interfaceName} extends RepositoryInterface
{

}
";
    }

    private function repositoryContents($name, $model)
    {
        $className = ucfirst($name) . 'Repository';
        $implement = $this->contractName($name);
return '<?php

namespace App\Repositories\Eloquent;

use App\Models\\' . $model . ';
use App\Presenters\\' . $model . 'Presenter;
use Prettus\Repository\Eloquent\BaseRepository;
use App\Contracts\Repository\\' . $implement . ';

class ' . $className . ' extends BaseRepository implements ' . $implement . '
{
    public function boot()
    {

    }

    public function model()
    {
        return ' . $model . '::class;
    }

    public function presenter()
    {
        return ' . $model . 'Presenter::class;
    }
}
';

    }
}
