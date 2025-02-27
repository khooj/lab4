{
  description = "A very basic flake";

  outputs =
    { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        packages = with pkgs; [ nodejs ];
        shellHook = ''
          export PATH=$PATH:$PWD/node_modules/.bin
        '';
      };
    };
}
